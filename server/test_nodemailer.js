
import { Resend } from "resend";

const resend = new Resend("re_3fLV2W1g_PZnn8ZC6u1LgVNTTKJB9g9rQ");
testNodemailer();
export default async function testNodemailer() {
    resend.emails
        .send({
            from: "onboarding@resend.dev",
            to: "venkata.saishree@replicon.com",
            subject: "Test Email from Resend",
            html: "Sent Mail",
        })
        .then((res) => {
            console.log("✅ Email sent successfully", res);
            return true;
        })
        .catch((err) => {
            console.error("❌ Failed to send email:", err);
            return false;
        });
}
