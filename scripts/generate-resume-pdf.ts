import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';

async function createResume() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  const { width, height } = page.getSize();
  let y = height - 42;

  // Header: Name
  page.drawText('Sappa Jayaram Siva Prasad', {
    x: 40,
    y,
    size: 20,
    font: fontBold,
    color: rgb(0.05, 0.05, 0.05),
  });
  y -= 18;

  // Title
  page.drawText('Software Engineer | AI-Powered Full-Stack Developer', {
    x: 40,
    y,
    size: 11,
    font: fontBold,
    color: rgb(0.2, 0.2, 0.2),
  });
  y -= 15;

  // Contact info
  page.drawText('jayramsappa537@gmail.com  |  +91 9381201226  |  Andhra Pradesh, India', {
    x: 40,
    y,
    size: 9.5,
    font: fontRegular,
    color: rgb(0.3, 0.3, 0.3),
  });
  y -= 13;

  page.drawText('linkedin.com/in/jayaram-sappa09  |  github.com/25A31A05GB  |  leetcode.com/u/25A31A05GB/', {
    x: 40,
    y,
    size: 9.5,
    font: fontRegular,
    color: rgb(0.1, 0.3, 0.6),
  });
  y -= 18;

  const drawSectionHeading = (title: string) => {
    page.drawLine({
      start: { x: 40, y: y + 8 },
      end: { x: width - 40, y: y + 8 },
      thickness: 0.75,
      color: rgb(0.8, 0.8, 0.8),
    });
    page.drawText(title, {
      x: 40,
      y,
      size: 10.5,
      font: fontBold,
      color: rgb(0.1, 0.1, 0.1),
    });
    y -= 14;
  };

  // PROFESSIONAL SUMMARY
  drawSectionHeading('PROFESSIONAL SUMMARY');
  const summaryText =
    'Computer Science and Engineering undergraduate focused on software engineering, AI-powered full-stack development, and practical application building. Develops web applications with React, TypeScript, Node.js, Express.js, and Supabase, and integrates generative AI APIs into application workflows.';
  
  // Wrap text
  page.drawText(summaryText.slice(0, 115), { x: 40, y, size: 9, font: fontRegular, color: rgb(0.2, 0.2, 0.2) });
  y -= 12;
  page.drawText(summaryText.slice(115), { x: 40, y, size: 9, font: fontRegular, color: rgb(0.2, 0.2, 0.2) });
  y -= 16;

  // EDUCATION
  drawSectionHeading('EDUCATION');
  page.drawText('B.Tech, Computer Science and Engineering', { x: 40, y, size: 9.5, font: fontBold });
  page.drawText('2025–2029', { x: width - 100, y, size: 9, font: fontRegular });
  y -= 12;
  page.drawText('Pragati Engineering College (Autonomous), Andhra Pradesh', { x: 40, y, size: 9, font: fontOblique });
  y -= 12;
  page.drawText('CGPA: 9.30/10  |  Coursework: Data Structures & Algorithms, OOP, Programming Fundamentals', { x: 40, y, size: 8.5, font: fontRegular });
  y -= 16;

  // TECHNICAL SKILLS
  drawSectionHeading('TECHNICAL SKILLS');
  const skills = [
    ['Languages:', 'Python, C++, JavaScript, TypeScript, Java, C, SQL'],
    ['Frontend:', 'React, HTML5, CSS3, Tailwind CSS, Vite, Responsive UI'],
    ['Backend/Data:', 'Node.js, Express.js, REST APIs, Supabase, SQL, Authentication, Document Processing'],
    ['AI/ML:', 'Google GenAI API, Prompt Engineering, RAG, Embeddings, ML Fundamentals, AI Agents'],
    ['Tools/Core:', 'Git, GitHub, VS Code, ServiceNow, DSA, OOP'],
  ];
  for (const [cat, list] of skills) {
    page.drawText(cat, { x: 40, y, size: 8.5, font: fontBold });
    page.drawText(list, { x: 120, y, size: 8.5, font: fontRegular, color: rgb(0.2, 0.2, 0.2) });
    y -= 11.5;
  }
  y -= 6;

  // EXPERIENCE
  drawSectionHeading('EXPERIENCE');
  page.drawText('ServiceNow Virtual Intern  |  ServiceNow', { x: 40, y, size: 9.5, font: fontBold });
  page.drawText('04/2026–05/2026', { x: width - 110, y, size: 8.5, font: fontRegular });
  y -= 11;
  page.drawText('• Exposure to ServiceNow Administration, ITSM, workflow automation, Flows, ATF, Reports & Analytics, and introductory Agentic AI.', { x: 45, y, size: 8.5, font: fontRegular, color: rgb(0.2, 0.2, 0.2) });
  y -= 13;

  page.drawText('Full-Stack Developer Intern  |  Thiranex', { x: 40, y, size: 9.5, font: fontBold });
  y -= 11;
  page.drawText('• Full-stack development internship experience through project implementation tasks.', { x: 45, y, size: 8.5, font: fontRegular, color: rgb(0.2, 0.2, 0.2) });
  y -= 13;

  page.drawText('Freelance Web Developer  |  Suto Cafe and Divines Eternity', { x: 40, y, size: 9.5, font: fontBold });
  y -= 11;
  page.drawText('• Built websites for client projects.', { x: 45, y, size: 8.5, font: fontRegular, color: rgb(0.2, 0.2, 0.2) });
  y -= 16;

  // PROJECTS
  drawSectionHeading('PROJECTS');
  const projects = [
    {
      title: 'EngiPrepHub — Engineering Preparation Platform',
      tech: 'React, TypeScript, Node.js, Express, Supabase, Google GenAI API',
      desc: '• Built a full-stack learning platform; integrated AI-assisted workflows, backend APIs, and document-processing tools. Live: engiprephub.in',
    },
    {
      title: 'TraceXMail — AI Email Threat Detection & Forensics',
      tech: 'React, TypeScript, Node.js, Express, Python, NLP/ML',
      desc: '• Developed email threat-analysis workflows covering email parsing, sender/URL checks, authentication signals, and IP/domain intelligence. Live: tracexmail.vercel.app',
    },
    {
      title: 'Verimedia AI — Media Provenance & Forensics',
      tech: 'React, TypeScript, Express, SQLite',
      desc: '• Built a media-investigation project for potentially manipulated or misused image, video, and audio content. Attended the IBM SkillsBuild Regional Hackathon finale with this project. Live: verimedia-ai-jade.vercel.app',
    },
    {
      title: 'QuizArena AI — Interactive Quiz Prototype',
      tech: 'HTML, CSS, JavaScript',
      desc: '• Created dynamic multiple-choice quizzes with score calculation, immediate feedback, and a responsive interface.',
    },
  ];

  for (const proj of projects) {
    page.drawText(proj.title, { x: 40, y, size: 9.5, font: fontBold });
    y -= 11;
    page.drawText(`Tech: ${proj.tech}`, { x: 45, y, size: 8.5, font: fontOblique, color: rgb(0.3, 0.3, 0.3) });
    y -= 11;
    page.drawText(proj.desc, { x: 45, y, size: 8.5, font: fontRegular, color: rgb(0.2, 0.2, 0.2) });
    y -= 13;
  }
  y -= 4;

  // ACHIEVEMENTS & CERTIFICATIONS
  drawSectionHeading('ACHIEVEMENTS & CERTIFICATIONS');
  page.drawText('Achievements:', { x: 40, y, size: 9, font: fontBold });
  page.drawText('Solved 150+ LeetCode problems; attended the IBM SkillsBuild Regional Hackathon finale with Verimedia AI;', { x: 120, y, size: 8.5, font: fontRegular });
  y -= 11;
  page.drawText('practices DSA using LeetCode, HackerRank, and GeeksforGeeks.', { x: 120, y, size: 8.5, font: fontRegular });
  y -= 13;
  page.drawText('Certifications:', { x: 40, y, size: 9, font: fontBold });
  page.drawText('ServiceNow Virtual Internship Program; Tata Data Visualization (Forage); Generative AI (Outskill);', { x: 120, y, size: 8.5, font: fontRegular });
  y -= 11;
  page.drawText('Python (Simplilearn); ChatGPT AI Essentials; Full Stack Developer Master Class.', { x: 120, y, size: 8.5, font: fontRegular });

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('public/resume.pdf', pdfBytes);
  console.log('Saved public/resume.pdf successfully');
}

createResume();
