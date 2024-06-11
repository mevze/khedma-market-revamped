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
import { config } from "@/emails/config";

interface PasswordResetEmailProps {
  name?: string;
  link: string;
  expiresAt: Date;
}

const PasswordResetEmail = ({
  name = "there",
  link,
  expiresAt,
}: PasswordResetEmailProps) => {
  return (
    <Html lang="en">
      <Preview>
        Hi {name}, reset your password for {config.name}.
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
                  Looks like you forgot your password. No worries, it happens!{" "}
                  <br />
                  click the link below to reset it:
                </Text>
                <Button
                  href={link}
                  className="rounded-lg bg-primary px-12 py-2 text-center font-medium leading-4 text-primary-foreground"
                >
                  Reset Password
                </Button>
                <Text className="mt-6 text-sm leading-tight text-muted-foreground">
                  For security purposes, this link will expire in{" "}
                  {toHumanReadableDiff({
                    start: new Date(),
                    end: expiresAt,
                  })}{" "}
                  <br />
                </Text>
                <Text className="text-sm leading-tight text-muted-foreground">
                  Alternatively, copy and paste the following link into your
                  browser:
                  <br />
                  <Link href={link} className="text-foreground underline">
                    {link}
                  </Link>
                </Text>
                <Text className="mt-4 text-xs leading-tight text-muted-foreground">
                  If you did not request a password reset, please ignore this
                  email.
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

export default PasswordResetEmail;

PasswordResetEmail.PreviewProps = {
  name: "Amy",
  link: `${config.baseURL}/reset-password?token=123`,
  // 30 minutes
  expiresAt: new Date(Date.now() + 30 * 60 * 1000),
} as PasswordResetEmailProps;
