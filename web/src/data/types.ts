export interface Scenario {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  pumpPipeTank: "pump" | "pipe" | "tank";
  color: string;
  stages: Stage[];
  criticalActions: CriticalAction[];
}

export interface Stage {
  id: string;
  label: string;
  narrative: string;
  vitals: Vitals;
  findings: string[];
  decision?: Decision;
  teachingPoint?: string;
}

export interface Vitals {
  hr: number;
  bp: string;
  spo2: number;
  rr: number;
  etco2?: number;
  rhythm?: string;
  gcs?: string;
  temp?: number;
}

export interface Decision {
  question: string;
  options: Option[];
}

export interface Option {
  id: string;
  text: string;
  correct: boolean;
  feedback: string;
  consequence?: string;
}

export interface CriticalAction {
  id: string;
  text: string;
  isCritical: boolean;
  stageId: string;
}

export interface TreeNode {
  id: string;
  type: "question" | "branch" | "result" | "action";
  label: string;
  description?: string;
  color?: string;
  children?: TreeEdge[];
}

export interface TreeEdge {
  label: string;
  targetId: string;
}

export interface Quadrant {
  id: "A" | "B" | "L" | "C";
  label: string;
  perfusion: "warm" | "cold";
  congestion: "dry" | "wet";
  clinicalPicture: string;
  treatment: string[];
  drugs: string[];
  danger?: string;
  scenarioLink?: string;
}
