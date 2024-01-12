import { env } from "@/env";
import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
interface ResetPasswordFromEmailTemplateProps {
  userEmail: string;
  code: string;
  userName: string;
}

export function ResetPasswordFromEmailTemplate({
  userEmail,
  code,
  userName,
}: ResetPasswordFromEmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Altere a sua password do Mukumbo</Preview>
      <Tailwind>
        <Body className="bg-white font-sans text-[#24292e]">
          <Container className="w-[480px] my-0 mx-auto pt-5 px-0 pb-[48px]">
            <Img
              src={`${env.FRONT_BASE_URL}/icon.svg`}
              width="32"
              height="32"
              alt="Github"
            />
            <Text className="text-2xl leading-tight">
              <strong>{userEmail}</strong>, uma solicitação de um código para
              Altere a sua password sua conta.
            </Text>
            <Section className="p-6 border border-[#dedede] rounded-[5px] text-center">
              <Text className="mx-0  mt-0 mb-[10px] text-left">
                Hey <strong>{userName}</strong>!
              </Text>
              <Text className="mx-0 mt-0 mb-[10px] text-left text-xl text-black">
                {code}
              </Text>
            </Section>

            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Se você não solicitou esse código, apenas descarte esse e-mail.
            </Text>
            <Text className="text-[#6a737d'] text-xs text-center mt-['60px']">
              Mukumbo, Inc. ・88 Colin P Kelly Jr Street ・San Francisco, CA
              94107
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
