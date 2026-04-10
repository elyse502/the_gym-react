import { createContext, useContext } from "react";
import { teamMembers, type TeamMember } from "../data/team.data";

interface TeamContextType {
  members: TeamMember[];
}

const TeamContext = createContext<TeamContextType | null>(null);

export function TeamProvider({ children }: { children: React.ReactNode }) {
  return (
    <TeamContext.Provider value={{ members: teamMembers }}>
      {children}
    </TeamContext.Provider>
  );
}

export function useTeam() {
  const context = useContext(TeamContext);
  if (!context) throw new Error("useTeam must be used within TeamProvider");
  return context;
}
