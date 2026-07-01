import type { Machine } from './machine';

export interface Site {
  id: string;
  name: string;
  shortName: string;
  city: string;
  province: string;
  region: string;
  industry: string;
  employees: number;
  revenueLabel: string;
  certifications: string[];
  gatewayId: string;
  machines: Machine[];
}
