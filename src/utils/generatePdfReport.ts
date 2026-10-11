import { jsPDF } from 'jspdf';
import { RoleId } from '../data/scenariosData';

export interface ParticipantRecord {
  id: string;
  name: string;
  employeeId: string;
  role: RoleId;
}

export interface ScenarioResultRecord {
  level: number;
  scenarioId: string;
  titleEn: string;
  score: number;
  attempts: number;
  passed: boolean;
  correctDecisions: string[];
  mistakes: string[];
}

export interface DrillReportData {
  participants: ParticipantRecord[];
  scenarioResults: ScenarioResultRecord[];
  overallScore: number;
  passed: boolean;
  totalTimeSeconds: number;
  dateStr: string;
}

export const generatePdfReport = (data: DrillReportData) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 16;

  // Header Banner
  doc.setFillColor(10, 15, 26);
  doc.rect(0, 0, pageWidth, 30, 'F');

  doc.setTextColor(245, 158, 11); // Gold
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('KING SALMAN INTERNATIONAL AIRPORT', 14, 11);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.text('Administrative & Corporate Offices Emergency Response Team (ERT) Report', 14, 17);

  doc.setTextColor(148, 163, 184);
  doc.setFontSize(7.5);
  doc.text(`Official Drill Record • Generated: ${data.dateStr} • Duration: ${Math.floor(data.totalTimeSeconds / 60)}m ${data.totalTimeSeconds % 60}s`, 14, 23);

  y = 36;

  // Status Badge Block
  doc.setFillColor(data.passed ? 240 : 254, data.passed ? 253 : 242, data.passed ? 244 : 242);
  doc.setDrawColor(data.passed ? 16 : 239, data.passed ? 185 : 68, data.passed ? 129 : 68);
  doc.setLineWidth(0.4);
  doc.roundedRect(14, y, pageWidth - 28, 18, 2.5, 2.5, 'FD');

  doc.setTextColor(data.passed ? 15 : 185, data.passed ? 118 : 28, data.passed ? 110 : 28);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(data.passed ? 'STATUS: DRILL CERTIFIED (PASSED)' : 'STATUS: RETRAINING REQUIRED', 20, y + 7);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`Overall Drill Grade: ${data.overallScore} / 100   |   Pass Mark: 70 / 100   |   Scenarios Completed: ${data.scenarioResults.length}`, 20, y + 13);

  y += 24;

  // Section 1: Team Roster
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  doc.text('1. PARTICIPANT ROSTER & ERT ROLES', 14, y);
  y += 4.5;

  // Table header
  doc.setFillColor(241, 245, 249);
  doc.rect(14, y, pageWidth - 28, 6.5, 'F');
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(51, 65, 85);
  doc.text('PARTICIPANT NAME', 18, y + 4.5);
  doc.text('EMPLOYEE ID', 85, y + 4.5);
  doc.text('ASSIGNED ERT ROLE', 135, y + 4.5);
  y += 7;

  // Rows
  doc.setFont('helvetica', 'normal');
  data.participants.forEach((p, idx) => {
    if (idx % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(14, y - 1, pageWidth - 28, 6, 'F');
    }
    doc.setTextColor(30, 41, 59);
    doc.text(p.name, 18, y + 3.5);
    doc.text(p.employeeId, 85, y + 3.5);
    
    const roleLabels: Record<RoleId, string> = {
      teamLeader: 'Team Leader',
      fireSuppression: 'Fire Suppression',
      casualtyCare: 'Casualty Care',
      evacuation: 'Evacuation',
      communications: 'Communications'
    };
    doc.text(roleLabels[p.role] || p.role, 135, y + 3.5);
    y += 6;
  });

  y += 4;

  // Section 2: Scenario Performance Summary (5 scenarios)
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  doc.text('2. SCENARIO EVALUATION & MULTI-STAGE GRADES', 14, y);
  y += 4.5;

  // Table Header
  doc.setFillColor(241, 245, 249);
  doc.rect(14, y, pageWidth - 28, 6.5, 'F');
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(51, 65, 85);
  doc.text('LEVEL & SCENARIO TITLE', 18, y + 4.5);
  doc.text('ATTEMPTS', 125, y + 4.5);
  doc.text('GRADE', 152, y + 4.5);
  doc.text('OUTCOME', 175, y + 4.5);
  y += 7;

  data.scenarioResults.forEach((s, idx) => {
    if (idx % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(14, y - 1, pageWidth - 28, 6, 'F');
    }
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(30, 41, 59);
    doc.text(`Level ${s.level}: ${s.titleEn}`, 18, y + 3.5, { maxWidth: 102 });
    doc.text(`${s.attempts}`, 128, y + 3.5);
    
    doc.setFont('helvetica', 'bold');
    doc.text(`${s.score} / 100`, 152, y + 3.5);

    doc.setTextColor(s.passed ? 16 : 220, s.passed ? 185 : 38, s.passed ? 129 : 38);
    doc.text(s.passed ? 'PASSED' : 'RETRY NEEDED', 175, y + 3.5);
    y += 6.5;
  });

  y += 4;

  // Section 3: What They Did Right & Areas of Improvement
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  doc.text('3. DETAILED PERFORMANCE & LNNH COMPLIANCE ANALYSIS', 14, y);
  y += 5;

  // Compliant / Done Right
  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(187, 247, 208);
  doc.roundedRect(14, y, (pageWidth - 32) / 2, 48, 2, 2, 'FD');

  doc.setTextColor(21, 128, 61);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.text('WHAT THE TEAM DID RIGHT (+):', 18, y + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(30, 41, 59);
  
  const rightPoints = [
    '• Maintained unified command and enforced zero civilian re-entry.',
    '• Applied 4-part LNNH protocol (Location, Nature, Numbers, Hazards).',
    '• Evaluated fire threshold (<60s, bin size, clear retreat path) before action.',
    '• Executed Hands-Only CPR (no breaths) and partner swap in <10s.',
    '• Provided calm, neuro-inclusive support for sensory sensitivity colleague.',
    '• Safely deployed Evac-Chair friction tracks for mobility colleague.'
  ];
  
  rightPoints.forEach((pt, i) => {
    doc.text(pt, 18, y + 12 + (i * 5.8), { maxWidth: (pageWidth - 44) / 2 });
  });

  // Areas of Improvement
  const rightBoxX = 14 + (pageWidth - 32) / 2 + 4;
  doc.setFillColor(254, 242, 242);
  doc.setDrawColor(254, 202, 202);
  doc.roundedRect(rightBoxX, y, (pageWidth - 32) / 2, 48, 2, 2, 'FD');

  doc.setTextColor(185, 28, 28);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.text('AREAS FOR IMPROVEMENT (Δ):', rightBoxX + 4, y + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(30, 41, 59);

  const deltaPoints = [
    '• Evacuate immediately if fire exceeds wastebin size or exit is blocked.',
    '• Avoid pausing chest compressions >10s during CPR partner swaps.',
    '• Always verify individual names during assembly roll call for missing staff.',
    '• Avoid dragging or shouting at coworkers with sensory alarm distress.',
    '• Ensure self-closing fire compartment doors latch shut behind egress.',
    '• Ensure strict visual/verbal clearance before AED shock delivery.'
  ];

  deltaPoints.forEach((pt, i) => {
    doc.text(pt, rightBoxX + 4, y + 12 + (i * 5.8), { maxWidth: (pageWidth - 44) / 2 });
  });

  y += 54;

  // Signoff & Official Seal note
  doc.setDrawColor(226, 232, 240);
  doc.line(14, y, pageWidth - 14, y);
  y += 5;

  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('Certified by King Salman International Airport Safety & Directorate Training Directorate.', 14, y);
  doc.text('Official validation of Administrative Office Emergency Response Team competency under GACA Part 139.', 14, y + 3.5);

  doc.save(`KSIA-Admin-ERT-Report-${data.dateStr.replace(/[/ :]/g, '-')}.pdf`);
};
