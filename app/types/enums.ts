export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export enum Occupation {
  STUDENT = 'STUDENT',
  ENGINEER = 'ENGINEER',
  TEACHER = 'TEACHER',
  UNEMPLOYED = 'UNEMPLOYED',
}

export const GENDER_LABELS: Record<Gender, string> = {
  [Gender.MALE]: 'Male',
  [Gender.FEMALE]: 'Female',
  [Gender.OTHER]: 'Other',
};

export const OCCUPATION_LABELS: Record<Occupation, string> = {
  [Occupation.STUDENT]: 'Student',
  [Occupation.ENGINEER]: 'Engineer',
  [Occupation.TEACHER]: 'Teacher',
  [Occupation.UNEMPLOYED]: 'Unemployed',
};
