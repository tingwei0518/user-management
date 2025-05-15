export const GENDER_OPTIONS = [
  { value: 'MALE', label: 'Male' },
  { value: 'FEMALE', label: 'Female' },
  { value: 'OTHER', label: 'Other' },
] as const

export const OCCUPATION_OPTIONS = [
  { value: 'STUDENT', label: 'Student' },
  { value: 'ENGINEER', label: 'Engineer' },
  { value: 'TEACHER', label: 'Teacher' },
  { value: 'UNEMPLOYED', label: 'Unemployed' },
] as const

export type Gender = typeof GENDER_OPTIONS[number]['value']
export type Occupation = typeof OCCUPATION_OPTIONS[number]['value'] 