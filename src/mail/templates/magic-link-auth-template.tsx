import { env } from '@/env'
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'
interface MagicLinkAuthTemplateProps {
  userEmail: string
  authLink: string
  username: string
}

export function MagicLinkAuthTemplate({
  userEmail,
  authLink,
  username,
}: MagicLinkAuthTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Faça~login na sua conta do Mukumbo</Preview>
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
              <strong>{userEmail}</strong>, uma solicitação de um link para
              login foi criado na sua conta.
            </Text>
            <Section className="p-6 border border-[#dedede] rounded-[5px] text-center">
              <Text className="mx-0  mt-0 mb-[10px] text-left">
                Hey <strong>{username}</strong>!
              </Text>
              <Text className="mx-0  mt-0 mb-[10px] text-left">
                O link é valdo apenas pelos próximos 5 minutos. se o link não
                funcionar, você pode ((<Link>reenviar</Link>)) novamente
                {userEmail}.
              </Text>

              <Button
                className="bg-['#28a745'] text-white leading-normal  shadow h-9 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors no-underline"
                href={authLink}
              >
                Entrar agora
              </Button>
              <Text className="text-black text-[14px] leading-[24px]">
                ou copie a URL abaixo e cole em seu browser:{' '}
                <Link href={authLink} className="text-sky-500 no-underline">
                  {authLink}
                </Link>
              </Text>
            </Section>

            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Se você não solicitou esse link de autenticação, apenas descarte
              esse e-mail.
            </Text>
            <Text className="text-[#6a737d'] text-xs text-center mt-['60px']">
              Mukumbo, Inc. ・88 Colin P Kelly Jr Street ・San Francisco, CA
              94107
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
