import { Env, corsHeaders } from "./types";

interface InquiryData {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

interface ValidationErrors {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// RFC 5322 compliant email regex
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// E.164 international phone format (10-15 digits, optional + prefix)
const PHONE_REGEX = /^\+?[1-9]\d{9,14}$/;

function normalizePhone(phone: string): string {
  return phone.replace(/[\s\-\.\(\)]/g, "");
}

function validate(data: InquiryData): { valid: boolean; errors: ValidationErrors } {
  const errors: ValidationErrors = { name: "", email: "", phone: "", message: "" };

  // Name: required, 1-100 chars
  if (!data.name?.trim()) {
    errors.name = "Name is required.";
  } else if (data.name.trim().length > 100) {
    errors.name = "Name must be 100 characters or less.";
  }

  // Email or phone required
  const hasEmail = !!data.email?.trim();
  const hasPhone = !!data.phone?.trim();
  const hasMsg = !!data.message?.trim();

  if (!hasEmail && !hasPhone) {
    errors.email = "Email or phone is required.";
    errors.phone = "Phone or email is required.";
  } else {
    if (hasEmail && !EMAIL_REGEX.test(data.email!.trim())) {
      errors.email = "Please enter a valid email address.";
    }
    if (hasPhone && !PHONE_REGEX.test(normalizePhone(data.phone!))) {
      errors.phone = "Please enter a valid phone number.";
    }
  }

  if (!hasMsg) {
    errors.message = "Message is required.";
  } else {
    if (data.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters.";
    } else if (data.message.length > 1000) {
      errors.message = "Message must be 1000 characters or less.";
    }
  }

  const valid = !Object.values(errors).some((e) => e.length > 0);
  return { valid, errors };
}

async function sendPushover(data: InquiryData, env: Env): Promise<boolean> {
  const message = `New inquiry!\n\nName: ${data.name}\nEmail: ${data.email || "N/A"}\nPhone: ${data.phone || "N/A"}\nMessage: ${data.message || "N/A"}`;
  const userKeys = env.PUSHOVER_USER_KEYS.split(",").map((k) => k.trim()).filter(Boolean);

  const results = await Promise.all(
    userKeys.map((user) =>
      fetch("https://api.pushover.net/1/messages.json", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ token: env.PUSHOVER_API_TOKEN, user, message }),
      })
    )
  );

  return results.some((r) => r.ok);
}

export async function handleInquiry(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") {
    return Response.json(
      { success: false, detail: "Method not allowed", data: { name: "", email: "", phone: "", message: "" } },
      { status: 405, headers: corsHeaders }
    );
  }

  try {
    const data: InquiryData = await request.json();
    const { valid, errors } = validate(data);

    if (!valid) {
      return Response.json(
        { success: false, detail: "Please fix the errors above.", data: errors },
        { headers: corsHeaders }
      );
    }

    await sendPushover(data, env);
    return Response.json(
      { success: true, detail: "Received! We'll reach out soon.", data: { name: "", email: "", phone: "", message: "" } },
      { headers: corsHeaders }
    );
  } catch {
    return Response.json(
      { success: false, detail: "Invalid request.", data: { name: "", email: "", phone: "", message: "" } },
      { status: 400, headers: corsHeaders }
    );
  }
}
