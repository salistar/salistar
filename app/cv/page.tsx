/**
 * @file app/cv/page.tsx
 * @description CV en ligne (trilingue FR/EN/AR) avec 3 PDF telechargeables.
 */
import type { Metadata } from 'next';
import { ContentShell } from '../components/ContentShell';
import { ContentFooter } from '../components/ContentFooter';
import { CvBody } from '../components/CvBody';

export const metadata: Metadata = {
  title: 'CV — Idriss Kriouile · DevOps · Test QA Manager · Tech Lead',
  description:
    "CV trilingue FR/EN/AR d'Idriss Kriouile : DevOps Senior, Test QA Manager et Tech Lead. 8+ ans en CI/CD, Kubernetes, GitOps, IaC, automatisation QA pour environnements bancaires.",
};

export default function CvPage() {
  return (
    <ContentShell back={{ href: '/' }}>
      <CvBody />
      <ContentFooter />
    </ContentShell>
  );
}
