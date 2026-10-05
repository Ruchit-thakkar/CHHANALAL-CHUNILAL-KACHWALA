import { NextResponse } from "next/server";

interface ReviewRequest {
  experience?: string;
}

// In-memory lightweight sliding-window rate limiter per client IP
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  const maxRequests = 10; // max 10 requests per minute per IP

  const record = rateLimitMap.get(ip);
  if (!record || now > record.expiresAt) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function POST(req: Request) {
  try {
    // 1. IP rate-limiting protection
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "anonymous";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "You are generating reviews too quickly. Please wait a moment before trying again.",
        },
        { status: 429 }
      );
    }

    // 2. Parse & sanitize user input
    let body: ReviewRequest = {};
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid request payload format." },
        { status: 400 }
      );
    }

    const rawExperience = (body.experience || "").trim();

    // Input length protection: up to 600 characters max
    if (rawExperience.length > 600) {
      return NextResponse.json(
        {
          success: false,
          error: "Please keep your note within 600 characters.",
        },
        { status: 400 }
      );
    }

    // Sanitize basic control characters
    const sanitizedExperience = rawExperience.replace(/[\u0000-\u001F\u007F-\u009F]/g, "").trim();

    // 3. Verify server-side Groq API key
    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
      console.error("GROQ_API_KEY is not configured in environment variables.");
      return NextResponse.json(
        {
          success: false,
          error: "Review generator service is momentarily unavailable. Please check back shortly.",
        },
        { status: 503 }
      );
    }

    // 4. Retrieve configurable Business Context
    const businessName = process.env.BUSINESS_NAME || "Chhanalal Chunilal Kachwala";
    const businessType =
      process.env.BUSINESS_TYPE ||
      "Glass, Aluminium & Mirror Architectural Fabrication Studio";
    const businessDescription =
      process.env.BUSINESS_DESCRIPTION ||
      "Specialized glass supply, toughened architectural glass railings, precision aluminium sliding doors & windows, and designer LED/custom mirrors.";
    const services =
      process.env.SERVICES ||
      "Glass Supply, Aluminium Windows & Doors, Toughened Glass Railing, LED Vanity Mirrors, Custom Designer Mirrors";
    const location = process.env.LOCATION || "Ahmedabad, Gujarat";

    // 5. Build strict, authentic system prompt
    const systemPrompt = `You are an AI assistant helping a real customer write an authentic, human-sounding Google review for "${businessName}".

BUSINESS CONTEXT (for accuracy and terminology only):
- Business Name: ${businessName}
- Industry/Type: ${businessType}
- Description: ${businessDescription}
- Core Services: ${services}
- Location: ${location}

STRICT GENERATION RULES:
1. Generate exactly 4 distinct, natural Google review suggestions based strictly on the customer's input and business context.
2. NEVER fabricate specific facts, projects, prices, staff names, dates, or experiences that the customer did not mention.
3. If the customer provided input, ground every review firmly in what they shared (e.g. good service, punctual installation, neat craftsmanship, friendly team).
4. If the customer provided little or empty input, create realistic, general positive reviews about quality craftsmanship, punctuality, and professionalism with glass/aluminium/mirror work at ${businessName}.
5. Write in natural, conversational human language. Avoid robotic phrases, marketing hype, or clichés like "look no further" or "delighted beyond measure".
6. Absolutely DO NOT say "As an AI...", "I was impressed by the prompt customer service", or mention AI.
7. Do not overuse exclamation marks or emojis (maximum 0-1 subtle emoji per review, or none at all).
8. Vary the style and tone across the 4 options:
   - Option 1 (Professional & Balanced): 2-3 sentences, composed, highlighting craftsmanship and reliability.
   - Option 2 (Warm & Friendly): 2-3 sentences, enthusiastic, praising the team and smooth experience.
   - Option 3 (Short & Crisp): 1-2 concise punchy sentences, ideal for busy mobile reviewers.
   - Option 4 (Detail & Quality Focused): 3-4 sentences, touching upon precision finishing, timeliness, and satisfaction.
9. Return output STRICTLY in JSON format with a single key "reviews" containing an array of 4 distinct strings. Example:
{"reviews": ["review 1", "review 2", "review 3", "review 4"]}`;

    const userPrompt = sanitizedExperience
      ? `Customer's experience notes: "${sanitizedExperience}"\n\nGenerate 4 authentic, natural Google review options for this experience at ${businessName}.`
      : `The customer had a great experience with ${businessName} for glass / aluminium / mirror work and wants 4 natural review options to choose from.`;

    // 6. Call Groq Chat Completions API with fallback models
    const candidateModels = ["qwen/qwen3.8-27b", "openai/gpt-oss-120b", "openai/gpt-oss-20b"];
    let groqResponse: Response | null = null;
    let selectedModel = "";

    for (const model of candidateModels) {
      try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${groqApiKey}`,
          },
          body: JSON.stringify({
            model: model,
            response_format: { type: "json_object" },
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt },
            ],
            temperature: 0.7,
            max_tokens: 700,
          }),
        });

        if (response.ok) {
          groqResponse = response;
          selectedModel = model;
          break;
        } else {
          const errData = await response.text();
          console.warn(`Groq model ${model} failed (${response.status}):`, errData);
        }
      } catch (err) {
        console.warn(`Network error calling model ${model}:`, err);
      }
    }

    if (!groqResponse) {
      return NextResponse.json(
        {
          success: false,
          error: "Could not generate reviews right now. Please try again in a few moments.",
        },
        { status: 502 }
      );
    }

    const data = await groqResponse.json();
    const rawContent = data.choices?.[0]?.message?.content;

    if (!rawContent) {
      return NextResponse.json(
        {
          success: false,
          error: "Empty response from review generator. Please try again.",
        },
        { status: 500 }
      );
    }

    // 7. Parse and validate JSON structure
    let parsed: any;
    try {
      parsed = JSON.parse(rawContent);
    } catch {
      // Fallback: extract json array or block if extra characters exist
      const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Unable to parse JSON from AI model output");
      }
    }

    let reviewsList: string[] = [];
    if (Array.isArray(parsed.reviews)) {
      reviewsList = parsed.reviews
        .filter((r: unknown) => typeof r === "string" && r.trim().length > 0)
        .map((r: string) => r.trim());
    } else if (Array.isArray(parsed)) {
      reviewsList = parsed
        .filter((r: unknown) => typeof r === "string" && r.trim().length > 0)
        .map((r: string) => r.trim());
    }

    if (reviewsList.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Could not format reviews. Please try again.",
        },
        { status: 500 }
      );
    }

    // Return the curated review suggestions
    return NextResponse.json({
      success: true,
      reviews: reviewsList.slice(0, 4),
      modelUsed: selectedModel,
    });
  } catch (error: any) {
    console.error("Unhandled error in /api/generate-review:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while generating reviews. Please try again.",
      },
      { status: 500 }
    );
  }
}
