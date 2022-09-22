export type School = {
  id: string;
  schoolName: string;
};

export type Skill = {
  id: string;
  skillName: string;
};

export type Wilder = {
  id: string;
  firstName: string;
  lastName: string;
  description: string;
  isTeacher: boolean;
  picture: string;
  school: School;
  skills: Skill[];
};
