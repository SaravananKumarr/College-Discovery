import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const colleges = [
  {
    name: 'Indian Institute of Technology Bombay',
    location: 'Powai, Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    type: 'Public',
    category: 'Engineering',
    fees: 250000,
    rating: 4.8,
    reviewCount: 1240,
    established: 1958,
    website: 'https://www.iitb.ac.in',
    description: 'IIT Bombay is one of the premier engineering institutions in India, known for its world-class research and academic excellence.',
    naacGrade: 'A++',
    nirfRank: 3,
    placement: { avgPackage: 28.5, highestPackage: 2.1, placementRate: 96, topRecruiters: 'Google,Microsoft,Amazon,Goldman Sachs,McKinsey' },
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, fees: 250000, seats: 120 },
      { name: 'B.Tech Electrical Engineering', duration: 4, fees: 250000, seats: 90 },
      { name: 'M.Tech AI & Data Science', duration: 2, fees: 45000, seats: 60 },
    ]
  },
  {
    name: 'Indian Institute of Technology Delhi',
    location: 'Hauz Khas, New Delhi',
    city: 'New Delhi',
    state: 'Delhi',
    type: 'Public',
    category: 'Engineering',
    fees: 245000,
    rating: 4.8,
    reviewCount: 1180,
    established: 1961,
    website: 'https://www.iitd.ac.in',
    description: 'IIT Delhi is a globally recognized institute of technology offering top-tier education in engineering, sciences, and management.',
    naacGrade: 'A++',
    nirfRank: 2,
    placement: { avgPackage: 26.8, highestPackage: 1.8, placementRate: 95, topRecruiters: 'Google,Microsoft,Amazon,Morgan Stanley,BCG' },
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, fees: 245000, seats: 100 },
      { name: 'B.Tech Mechanical Engineering', duration: 4, fees: 245000, seats: 80 },
      { name: 'MBA', duration: 2, fees: 580000, seats: 52 },
    ]
  },
  {
    name: 'BITS Pilani',
    location: 'Vidya Vihar, Pilani',
    city: 'Pilani',
    state: 'Rajasthan',
    type: 'Deemed',
    category: 'Engineering',
    fees: 520000,
    rating: 4.6,
    reviewCount: 980,
    established: 1964,
    website: 'https://www.bits-pilani.ac.in',
    description: 'BITS Pilani is a leading private technical university known for its industry connections, dual-degree programs, and strong alumni network.',
    naacGrade: 'A',
    nirfRank: 18,
    placement: { avgPackage: 22.3, highestPackage: 1.5, placementRate: 93, topRecruiters: 'Microsoft,Google,Goldman Sachs,Uber,Qualcomm' },
    courses: [
      { name: 'B.E. Computer Science', duration: 4, fees: 520000, seats: 200 },
      { name: 'B.E. Electronics & Communication', duration: 4, fees: 520000, seats: 160 },
      { name: 'M.Sc. Mathematics', duration: 5, fees: 480000, seats: 80 },
    ]
  },
  {
    name: 'Vellore Institute of Technology',
    location: 'Vellore, Tamil Nadu',
    city: 'Vellore',
    state: 'Tamil Nadu',
    type: 'Deemed',
    category: 'Engineering',
    fees: 198000,
    rating: 4.2,
    reviewCount: 2100,
    established: 1984,
    website: 'https://vit.ac.in',
    description: 'VIT is one of India\'s largest private universities known for its international collaborations, modern infrastructure, and strong placement record.',
    naacGrade: 'A++',
    nirfRank: 11,
    placement: { avgPackage: 8.5, highestPackage: 0.45, placementRate: 88, topRecruiters: 'TCS,Infosys,Wipro,Cognizant,Amazon' },
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, fees: 198000, seats: 600 },
      { name: 'B.Tech AI & Machine Learning', duration: 4, fees: 210000, seats: 300 },
      { name: 'MBA', duration: 2, fees: 180000, seats: 120 },
    ]
  },
  {
    name: 'Manipal Academy of Higher Education',
    location: 'Manipal, Udupi',
    city: 'Manipal',
    state: 'Karnataka',
    type: 'Deemed',
    category: 'Engineering',
    fees: 215000,
    rating: 4.1,
    reviewCount: 1650,
    established: 1957,
    website: 'https://manipal.edu',
    description: 'Manipal Academy is a renowned deemed university offering diverse programs with a global campus atmosphere and strong industry linkages.',
    naacGrade: 'A++',
    nirfRank: 14,
    placement: { avgPackage: 7.2, highestPackage: 0.42, placementRate: 85, topRecruiters: 'TCS,HCL,Infosys,Mindtree,Mphasis' },
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, fees: 215000, seats: 360 },
      { name: 'MBBS', duration: 5, fees: 1200000, seats: 150 },
      { name: 'B.Arch', duration: 5, fees: 195000, seats: 80 },
    ]
  },
  {
    name: 'Delhi University - SRCC',
    location: 'North Campus, New Delhi',
    city: 'New Delhi',
    state: 'Delhi',
    type: 'Public',
    category: 'Commerce',
    fees: 28000,
    rating: 4.5,
    reviewCount: 760,
    established: 1926,
    website: 'https://srcc.edu',
    description: 'Shri Ram College of Commerce is India\'s most prestigious commerce college, consistently ranked #1 in its category with outstanding placement record.',
    naacGrade: 'A+',
    nirfRank: 7,
    placement: { avgPackage: 12.4, highestPackage: 0.65, placementRate: 92, topRecruiters: 'Deloitte,EY,KPMG,Goldman Sachs,McKinsey' },
    courses: [
      { name: 'B.Com (Hons)', duration: 3, fees: 28000, seats: 530 },
      { name: 'BA Economics (Hons)', duration: 3, fees: 26000, seats: 80 },
    ]
  },
  {
    name: 'NIT Trichy',
    location: 'Tanjore Main Road, Tiruchirappalli',
    city: 'Tiruchirappalli',
    state: 'Tamil Nadu',
    type: 'Public',
    category: 'Engineering',
    fees: 152000,
    rating: 4.5,
    reviewCount: 890,
    established: 1964,
    website: 'https://www.nitt.edu',
    description: 'NIT Trichy is one of the top National Institutes of Technology in India known for exceptional engineering education and strong placement records.',
    naacGrade: 'A++',
    nirfRank: 8,
    placement: { avgPackage: 16.8, highestPackage: 1.2, placementRate: 94, topRecruiters: 'Google,Amazon,Samsung,Qualcomm,Adobe' },
    courses: [
      { name: 'B.Tech Computer Science', duration: 4, fees: 152000, seats: 90 },
      { name: 'B.Tech Civil Engineering', duration: 4, fees: 152000, seats: 120 },
      { name: 'M.Tech VLSI Design', duration: 2, fees: 30000, seats: 30 },
    ]
  },
  {
    name: 'Christ University',
    location: 'Hosur Road, Bengaluru',
    city: 'Bengaluru',
    state: 'Karnataka',
    type: 'Deemed',
    category: 'Arts',
    fees: 185000,
    rating: 4.0,
    reviewCount: 1420,
    established: 1969,
    website: 'https://christuniversity.in',
    description: 'Christ University is a well-known deemed university offering diverse UG and PG programs across disciplines with a strong focus on holistic education.',
    naacGrade: 'A+',
    nirfRank: 42,
    placement: { avgPackage: 5.8, highestPackage: 0.35, placementRate: 82, topRecruiters: 'Deloitte,Accenture,HDFC,ICICI,Infosys' },
    courses: [
      { name: 'BBA', duration: 3, fees: 185000, seats: 400 },
      { name: 'BA Psychology', duration: 3, fees: 165000, seats: 120 },
      { name: 'B.Sc Data Science', duration: 3, fees: 175000, seats: 180 },
    ]
  },
]

async function main() {
  console.log('Seeding database...')

  for (const college of colleges) {
    const { placement, courses, ...collegeData } = college
    const created = await prisma.college.create({
      data: {
        ...collegeData,
        placements: { create: placement },
        courses: { create: courses }
      }
    })
    console.log(`Created: ${created.name}`)
  }

  console.log('Seeding complete!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
