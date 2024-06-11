import {
  Tailwind,
  Button,
  Html,
  Head,
  Font,
  Preview,
  Container,
  Text,
  Img,
  Link,
  Hr,
  Column,
  Row,
  Body,
  Heading,
} from "@react-email/components";
import { tailwindConfig, toHumanReadableDiff } from "@/emails/utils";
import { format } from "date-fns";
import { config } from "@/emails/config";

interface VerificationEmailProps {
  name?: string;
  link: string;
  expiresAt: Date;
}

const VerificationEmail = ({
  name = "there",
  link,
  expiresAt,
}: VerificationEmailProps) => {
  return (
    <Html lang="en">
      <Preview>
        Hello {name}, please verify your email for {config.name}.
      </Preview>
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Tailwind config={tailwindConfig}>
        <Body className="mx-auto my-auto bg-white px-2">
          <Container>
            <Column className="rounded-lg px-4 py-2">
              <Row>
                <Img src={config.logo} className="h-10 w-10" />
              </Row>
              <Hr className="my-6" />
              <Row>
                <Heading className="mb-4 text-lg font-semibold leading-tight text-foreground">
                  Hello, {name} 👋
                </Heading>
                <Text className="mb-4 text-base leading-tight text-foreground">
                  Thank you for registering for {config.name}. Please click the
                  link below to verify your email address.
                </Text>
                <Button
                  href={link}
                  className="rounded-lg bg-primary px-12 py-2 text-center font-medium leading-4 text-primary-foreground"
                >
                  Verify Email
                </Button>
                <Text className="mt-6 text-sm leading-tight text-muted-foreground">
                  {format(expiresAt, "eeee, MMMM do, yyyy 'at' HH:mm 'UTC'")}.
                  The link will expire in{" "}
                  {toHumanReadableDiff({
                    start: new Date(),
                    end: new Date(
                      expiresAt.setMinutes(expiresAt.getMinutes() + 1),
                    ),
                  })}{" "}
                </Text>
                <Text className="-mt-2 text-sm leading-tight text-muted-foreground">
                  Alternatively, you can copy and paste the following link into
                  your browser: <br />
                  <Link href={link} className="text-foreground underline">
                    {link}
                  </Link>
                </Text>
                <Text className="mt-2 text-xs leading-tight text-muted-foreground">
                  If you didn't request this, you can safely ignore this email.
                </Text>
              </Row>
              <Hr />
              <Row>
                <Text className="text-xs font-medium leading-tight tracking-tight text-muted-foreground">
                  © {new Date().getFullYear()} {config.name}. All rights
                  reserved.
                </Text>
              </Row>
            </Column>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerificationEmail;

VerificationEmail.PreviewProps = {
  name: "Mohamed",
  link: `${config.baseURL}/verify-email?token=123`,
  // 24 hours
  expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
} as VerificationEmailProps;
