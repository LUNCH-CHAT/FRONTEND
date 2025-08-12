// 기본 프로필 S3 URL 목록 
export const DEFAULT_PROFILE_IMAGES = [
  'https://lunchchat-images.s3.ap-northeast-2.amazonaws.com/profile-images/c76d18c6-b963-4b6b-ae36-086b5795fb69_profile-1.png',
  'https://lunchchat-images.s3.ap-northeast-2.amazonaws.com/profile-images/9b4ea47e-eca9-4397-9750-5d4ed6160fb4_profile-2.png',
  'https://lunchchat-images.s3.ap-northeast-2.amazonaws.com/profile-images/24f459e0-5301-4d04-9955-0ebd5d576cb8_profile-3.png',
] as const;

export const pickRandomDefaultProfile = () =>
  DEFAULT_PROFILE_IMAGES[Math.floor(Math.random() * DEFAULT_PROFILE_IMAGES.length)];
