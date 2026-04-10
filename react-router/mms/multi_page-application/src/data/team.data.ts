export interface TeamMember {
  id: string;
  name: string;
  role: "Manager" | "Developer" | "Designer";
}

export const teamMembers: TeamMember[] = [
  { id: "1", name: "Alice Johnson", role: "Manager" },
  { id: "2", name: "Brian Smith", role: "Developer" },
  { id: "3", name: "Clara Lee", role: "Designer" },
  { id: "4", name: "David Kim", role: "Developer" },
];
