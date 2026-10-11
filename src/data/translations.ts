export type Language = 'en' | 'ar';

export interface TranslationStrings {
  // Common
  appTitle: string;
  appSubtitle: string;
  langName: string;
  next: string;
  back: string;
  retry: string;
  startDrill: string;
  submit: string;
  passed: string;
  failed: string;
  score: string;
  minPassingScore: string;
  level: string;
  stage: string;
  timeRemaining: string;
  totalTime: string;
  sound: string;

  // Splash & Registration
  splashTitle: string;
  splashDesc: string;
  teamSetupTitle: string;
  teamSetupDesc: string;
  groupRequirement: string;
  participant: string;
  addMember: string;
  removeMember: string;
  namePlaceholder: string;
  idPlaceholder: string;
  rolePlaceholder: string;
  nameLabel: string;
  idLabel: string;
  roleLabel: string;
  roleAssignedError: string;
  fillAllFieldsError: string;
  minParticipantsError: string;
  maxParticipantsReached: string;

  // ERT Roles
  teamLeader: string;
  fireSuppression: string;
  casualtyCare: string;
  evacuation: string;
  communications: string;

  // Roles Descriptions
  teamLeaderDesc: string;
  fireSuppressionDesc: string;
  casualtyCareDesc: string;
  evacuationDesc: string;
  communicationsDesc: string;

  // Gameplay & LNNH
  scenarioBrief: string;
  locationLabel: string;
  hazardLabel: string;
  casualtyLabel: string;
  occupantCount: string;
  turnNotice: string;
  selectBestAction: string;
  confirmChoice: string;
  teamDiscussionNote: string;
  lnnhProtocolNote: string;
  whyFailedTitle: string;
  whatYouDidRightTitle: string;
  areasToImproveTitle: string;
  scenarioSuccessTitle: string;
  scenarioFailedTitle: string;
  retryScenarioBtn: string;
  nextScenarioBtn: string;
  proceedToStage2Btn: string;
  reviewAnswers: string;

  // Final Dashboard
  finalTitle: string;
  finalSubtitle: string;
  overallScore: string;
  certStatus: string;
  certifiedBadge: string;
  retrainBadge: string;
  scenariosCompleted: string;
  downloadPdf: string;
  restartDrill: string;
}

export const translations: Record<Language, TranslationStrings> = {
  en: {
    appTitle: 'KSIA ERT Drill',
    appSubtitle: 'Airport Administration Offices Emergency Simulator',
    langName: 'English',
    next: 'Next',
    back: 'Back',
    retry: 'Retry Scenario',
    startDrill: 'START DRILL',
    submit: 'Submit Decisions',
    passed: 'PASSED',
    failed: 'FAILED',
    score: 'Score',
    minPassingScore: 'Passing score: 70/100',
    level: 'Level',
    stage: 'Stage',
    timeRemaining: 'Remaining',
    totalTime: 'Total Time',
    sound: 'Audio',

    splashTitle: 'Office Emergency Readiness Drill',
    splashDesc: 'Designed for King Salman International Airport administration staff. Form a team of 3 to 5 colleagues, take on certified ERT roles, and resolve escalating office emergencies.',
    teamSetupTitle: 'Team Registration',
    teamSetupDesc: 'Register 3 to 5 team members. Roles must be unique for each participant.',
    groupRequirement: 'Group size: 3 to 5 members with unique roles.',
    participant: 'Participant',
    addMember: '+ Add Participant',
    removeMember: 'Remove',
    nameLabel: 'Full Name',
    namePlaceholder: 'e.g. Sarah Al-Otaibi',
    idLabel: 'Employee ID',
    idPlaceholder: 'e.g. KSIA-4821',
    roleLabel: 'Assigned ERT Role',
    rolePlaceholder: 'Select a role',
    roleAssignedError: 'This role is already assigned to another team member.',
    fillAllFieldsError: 'Please fill in all names, employee IDs, and select unique roles.',
    minParticipantsError: 'A minimum of 3 participants is required to begin the drill.',
    maxParticipantsReached: 'Maximum 5 participants reached.',

    teamLeader: 'Team Leader',
    fireSuppression: 'Fire Suppression',
    casualtyCare: 'Casualty Care',
    evacuation: 'Evacuation',
    communications: 'Communications',

    teamLeaderDesc: 'Directs the team, maintains calm, and coordinates with building safety.',
    fireSuppressionDesc: 'Handles small fires using extinguishers and isolates electrical sources.',
    casualtyCareDesc: 'Delivers first aid, checks consciousness, and provides AED care.',
    evacuationDesc: 'Guides coworkers safely out through clear exits and checks quiet rooms.',
    communicationsDesc: 'Follows LNNH (Location, Nature, Numbers, Hazards) reporting to AOCC.',

    scenarioBrief: 'Situation Brief',
    locationLabel: 'Location',
    hazardLabel: 'Hazards',
    casualtyLabel: 'Casualty',
    occupantCount: 'Office Staff at Risk',
    turnNotice: 'Active Turn for Role',
    selectBestAction: 'Discuss as a group and select the safest action:',
    confirmChoice: 'Confirm Team Choice',
    teamDiscussionNote: 'Discuss as a team before deciding. Weigh every operational factor carefully.',
    lnnhProtocolNote: 'Communications Liaison: Strictly follow the 4-part LNNH protocol (Location, Nature, Number, Hazard).',
    whyFailedTitle: 'Why You Failed This Scenario:',
    whatYouDidRightTitle: 'What You Did Right:',
    areasToImproveTitle: 'Areas for Improvement:',
    scenarioSuccessTitle: 'Scenario Stage Resolved Successfully!',
    scenarioFailedTitle: 'Scenario Failed - Retraining Needed',
    retryScenarioBtn: 'Retry This Scenario',
    nextScenarioBtn: 'Proceed to Next Scenario Level',
    proceedToStage2Btn: 'Proceed to Stage 2 Escalation',
    reviewAnswers: 'Review Decisions',

    finalTitle: 'Drill Completion Summary',
    finalSubtitle: 'KSIA Administration Offices Emergency Readiness Record',
    overallScore: 'Overall Team Score',
    certStatus: 'Certification Status',
    certifiedBadge: 'KSIA ERT CERTIFIED',
    retrainBadge: 'RETRAINING REQUIRED',
    scenariosCompleted: 'Scenarios Completed',
    downloadPdf: 'Download Official Report (PDF)',
    restartDrill: 'Start New Drill',
  },
  ar: {
    appTitle: 'تدريب طوارئ مطار الملك سلمان',
    appSubtitle: 'محاكي الطوارئ لمكاتب إدارة مطار الملك سلمان الدولي',
    langName: 'العربية',
    next: 'التالي',
    back: 'السابق',
    retry: 'إعادة المحاولة',
    startDrill: 'بدء التدريب',
    submit: 'إرسال القرارات',
    passed: 'ناجح',
    failed: 'لم يجتز',
    score: 'الدرجة',
    minPassingScore: 'درجة الاجتياز: 70/100',
    level: 'المستوى',
    stage: 'المرحلة',
    timeRemaining: 'الوقت المتبقي',
    totalTime: 'إجمالي الوقت',
    sound: 'الصوت',

    splashTitle: 'تدريب الجاهزية لطوارئ المكاتب',
    splashDesc: 'مخصص لموظفي المكاتب الإدارية بمطار الملك سلمان الدولي. كوّن فريقاً من 3 إلى 5 زملاء، وتولوا مهام الاستجابة لحالات الطوارئ المتصاعدة.',
    teamSetupTitle: 'تسجيل أعضاء الفريق',
    teamSetupDesc: 'سجل من 3 إلى 5 مشاركين. يجب أن يكون لكل مشارك دور طوارئ مختلف ومحدد.',
    groupRequirement: 'عدد أعضاء الفريق: من 3 إلى 5 مشاركين بأدوار فريدة.',
    participant: 'المشارك',
    addMember: '+ إضافة مشارك',
    removeMember: 'حذف',
    nameLabel: 'الاسم الكامل',
    namePlaceholder: 'مثال: سارة العتيبي',
    idLabel: 'الرقم الوظيفي',
    idPlaceholder: 'مثال: KSIA-4821',
    roleLabel: 'الدور في فريق الطوارئ',
    rolePlaceholder: 'اختر الدور',
    roleAssignedError: 'هذا الدور مخصص بالفعل لزميل آخر في الفريق.',
    fillAllFieldsError: 'يرجى إكمال جميع الأسماء، الأرقام الوظيفية، واختيار أدوار مختلفة.',
    minParticipantsError: 'الحد الأدنى لبدء التدريب هو 3 مشاركين.',
    maxParticipantsReached: 'الحد الأقصى هو 5 مشاركين.',

    teamLeader: 'قائد الفريق',
    fireSuppression: 'مكافحة الحريق',
    casualtyCare: 'الإسعافات الأولية',
    evacuation: 'الإخلاء والتوجيه',
    communications: 'الاتصالات والبلاغات',

    teamLeaderDesc: 'يوجه الفريق ويحافظ على الهدوء وينسق مع إدارة المبنى.',
    fireSuppressionDesc: 'يتعامل مع الحرائق الصغيرة بالمطفأة ويفصل مصادر الكهرباء.',
    casualtyCareDesc: 'يقدم الإسعافات الأولية ويفحص التنفس ويستخدم جهاز الصدمات (AED).',
    evacuationDesc: 'يرشد الموظفين نحو مخارج الطوارئ الآمنة ويتأكد من خلو الغرف.',
    communicationsDesc: 'يطبق بروتوكول LNNH (الموقع، النوع، الأعداد، المخاطر) عند البلاغ.',

    scenarioBrief: 'ملخص الحالة والواقعة',
    locationLabel: 'الموقع',
    hazardLabel: 'المخاطر',
    casualtyLabel: 'المصاب',
    occupantCount: 'الموظفون في منطقة الخطر',
    turnNotice: 'الدور الآن على',
    selectBestAction: 'تشاوروا كفريق واختاروا الإجراء الأكثر أماناً:',
    confirmChoice: 'تأكيد اختيار الفريق',
    teamDiscussionNote: 'تناقشوا كفريق قبل اتخاذ القرار، وازنوا بين كافة العوامل الميدانية بعناية.',
    lnnhProtocolNote: 'مسؤول الاتصالات: التزم ببروتوكول LNNH الرباعي بدقة (الموقع، النوع، الأعداد، المخاطر).',
    whyFailedTitle: 'أسباب عدم اجتياز هذا السيناريو:',
    whatYouDidRightTitle: 'ما أحسنتم فعله:',
    areasToImproveTitle: 'نقاط للتحسين والتطوير:',
    scenarioSuccessTitle: 'تمت معالجة مرحلة السيناريو بنجاح!',
    scenarioFailedTitle: 'لم يتم اجتياز السيناريو - يلزم إعادة التدريب',
    retryScenarioBtn: 'إعادة محاولة هذا السيناريو',
    nextScenarioBtn: 'الانتقال إلى سيناريو المستوى التالي',
    proceedToStage2Btn: 'الانتقال إلى المرحلة 2 (تصاعد الحدث)',
    reviewAnswers: 'مراجعة القرارات',

    finalTitle: 'التقرير الختامي للتدريب',
    finalSubtitle: 'سجل جاهزية طوارئ مكاتب مطار الملك سلمان الدولي',
    overallScore: 'الدرجة الكلية للفريق',
    certStatus: 'حالة الاعتماد والاجتياز',
    certifiedBadge: 'معتمد وجاهز للطوارئ (KSIA ERT)',
    retrainBadge: 'يتطلب إعادة التدريب',
    scenariosCompleted: 'السيناريوهات المكتملة',
    downloadPdf: 'تحميل التقرير الرسمي (PDF بالإنجليزية)',
    restartDrill: 'بدء تدريب جديد',
  }
};
