export interface Applicant {
  id: string;
  parentName: string;
  studentName: string;
  studentGrade: string;
  phone: string;
  email: string;
  englishLevel: string;
  expectations: string;
  submittedAt: string;
  status: 'pending' | 'contacted' | 'interviewed' | 'accepted' | 'rejected';
  notes: string;
}

export type EnglishLevel = 'Flyers' | 'KET' | 'PET' | 'IELTS' | 'Other';
