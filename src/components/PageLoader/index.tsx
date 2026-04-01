import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from { transform: scaleX(0); }
`;

const Bar = styled.div<{ $progress: number; $visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  width: ${({ $progress }) => $progress}%;
  background: ${({ theme }) => theme.colors.primary};
  box-shadow: 0 0 8px ${({ theme }) => theme.colors.primary}60;
  z-index: 9999;
  transition: width 0.3s ease;
  transform-origin: left;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: none;
`;

export default function PageLoader() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const start = () => {
      setVisible(true);
      setProgress(20);
      timer = setTimeout(() => setProgress(50), 150);
    };

    const done = () => {
      setProgress(100);
      setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 300);
    };

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", done);
    router.events.on("routeChangeError", done);

    return () => {
      clearTimeout(timer);
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", done);
      router.events.off("routeChangeError", done);
    };
  }, [router]);

  return <Bar $progress={progress} $visible={visible} />;
}
