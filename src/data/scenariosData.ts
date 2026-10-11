export type RoleId = 
  | 'teamLeader' 
  | 'fireSuppression' 
  | 'casualtyCare' 
  | 'evacuation' 
  | 'communications';

export interface DecisionOption {
  id: string;
  textEn: string;
  textAr: string;
  isCorrect: boolean;
  score: number; // 100 for correct, 25-35 for realistic distractor, 0 for dangerous error
  feedbackEn: string;
  feedbackAr: string;
  dangerFlag?: boolean;
}

export interface RoleDecision {
  roleId: RoleId;
  questionEn: string;
  questionAr: string;
  contextEn: string;
  contextAr: string;
  options: DecisionOption[]; // 4 balanced options with distributed correct positions
}

export interface ScenarioStage {
  id: string;
  stageNumber: number;
  stageTitleEn: string;
  stageTitleAr: string;
  situationEn: string;
  situationAr: string;
  decisions: Record<RoleId, RoleDecision>;
}

export interface DrillScenario {
  id: string;
  level: number;
  difficulty: 'Easy' | 'Moderate' | 'Intermediate' | 'Advanced' | 'Master Drill';
  difficultyAr: string;
  titleEn: string;
  titleAr: string;
  locationEn: string;
  locationAr: string;
  occupants: number;
  descriptionEn: string;
  descriptionAr: string;
  hazardsEn: string[];
  hazardsAr: string[];
  casualtiesEn: string;
  casualtiesAr: string;
  visualType: 'microwave_fire' | 'medical_collapse' | 'server_smoke' | 'chemical_spill' | 'stairwell_evac';
  stages: ScenarioStage[];
}

export const DRILL_SCENARIOS: DrillScenario[] = [
  // =========================================================================
  // SCENARIO 1: LEVEL 1 (EASY) - BREAKROOM MICROWAVE & CORRIDOR INFLUX
  // =========================================================================
  {
    id: 'pantry_fire',
    level: 1,
    difficulty: 'Easy',
    difficultyAr: 'المستوى 1: مبتدئ',
    titleEn: 'Breakroom Microwave Spark & Small Fire',
    titleAr: 'شرارة ميكروويف واشتعال في مطبخ الموظفين',
    locationEn: 'Administration Building - 2nd Floor Staff Pantry',
    locationAr: 'مبنى الإدارة - مطبخ الموظفين بالدور الثاني',
    occupants: 22,
    descriptionEn: 'A microwave in the 2nd-floor staff pantry sparked and caught fire. Paper napkins ignited, and smoke is beginning to drift into the open cubicle area.',
    descriptionAr: 'حدثت شرارة في ميكروويف مطبخ الدور الثاني فاشتعلت مناديل ورقية وبدأ الدخان بالتسرب إلى صالة المكاتب المفتوحة.',
    hazardsEn: ['Electrical appliance fire', 'Smoke in corridor', 'Panicked employees leaving belongings'],
    hazardsAr: ['حريق كهربائي صغير بالمطبخ', 'تسرب الدخان للممر', 'ارتباك بعض الموظفين'],
    casualtiesEn: 'None initially (1 worker coughing from smoke)',
    casualtiesAr: 'لا توجد إصابات حرجة (سعال خفيف لأحد الموظفين)',
    visualType: 'microwave_fire',
    stages: [
      {
        id: 'pantry_s1',
        stageNumber: 1,
        stageTitleEn: 'Stage 1: Initial Alarm & First Response',
        stageTitleAr: 'المرحلة 1: الإنذار الأولي والاستجابة الأولى',
        situationEn: 'The pantry smoke detector sounds. Gray smoke drifts into the hallway. Two colleagues are arguing near the kitchen door.',
        situationAr: 'انطلق إنذار الدخان وبدأ دخان رمادي بالخروج للممر، ويوجد موظفان يتجادلان قرب باب المطبخ.',
        decisions: {
          teamLeader: {
            roleId: 'teamLeader',
            questionEn: 'What is your primary command decision as Team Leader right now?',
            questionAr: 'ما هو قرارك القيادي الأول كقائد للفريق في هذه اللحظة؟',
            contextEn: 'You observe smoke entering the corridor and staff beginning to look confused.',
            contextAr: 'تشاهد الدخان يخرج للممر والموظفون يتلفتون بارتباك.',
            options: [
              {
                id: 'tl_1_a',
                textEn: 'Walk into the kitchen alone to examine the flames before notifying anyone on the floor.',
                textAr: 'الدخول للمطبخ بمفردك لمعاينة حجم اللهب بنفسك قبل إشعار أي موظف في الدور.',
                isCorrect: false,
                score: 25,
                feedbackEn: 'Investigating alone delays floor warning and risks commander smoke incapacitation.',
                feedbackAr: 'الذهاب بمفردك يؤخر إشعار الموظفين ويعرض القائد لخطر استنشاق الدخان وفقدان الوعي.'
              },
              {
                id: 'tl_1_b',
                textEn: 'Instruct the floor to start an orderly evacuation and dispatch ERT members to their stations.',
                textAr: 'توجيه الموظفين ببدء إخلاء هادئ ومنظم وتوزيع أعضاء فريق الطوارئ على مهامهم المحددة.',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Correct! Keeping calm, ordering orderly movement, and assigning ERT roles establishes immediate control.',
                feedbackAr: 'صحيح ومثالي! توجيه الموظفين بهدوء وتوزيع المهام يحافظ على السيطرة ويمنع التدافع.'
              },
              {
                id: 'tl_1_c',
                textEn: 'Await administrative confirmation from building facilities management before alerting floor occupants.',
                textAr: 'انتظار تأكيد إداري من قسم إدارة المرافق قبل تنبيه الموظفين المتواجدين في الدور.',
                isCorrect: false,
                score: 20,
                feedbackEn: 'Waiting for bureaucratic confirmation allows early incipient fires to spread unhindered.',
                feedbackAr: 'انتظار الموافقات الإدارية يضيع الوقت الثمين ويسمح للنار بالانتشار في أرجاء المبنى.'
              },
              {
                id: 'tl_1_d',
                textEn: 'Instruct staff to remain seated at workstations until the primary alarm sirens activate automatically.',
                textAr: 'الطلب من الموظفين البقاء جالسين في مكاتبهم حتى تنطلق صفارات الإنذار المركزية تلقائياً.',
                isCorrect: false,
                score: 15,
                dangerFlag: true,
                feedbackEn: 'Passive delay risks trapping personnel if smoke dampers fail to contain toxic migration.',
                feedbackAr: 'الانتظار السلبي يعرض الموظفين للحصار بالدخان في حال تأخر عمل أنظمة الإنذار المركزية.'
              }
            ]
          },
          fireSuppression: {
            roleId: 'fireSuppression',
            questionEn: 'How should Fire Suppression evaluate the threshold criteria before attacking the fire?',
            questionAr: 'كيف يقيم مسؤول الإطفاء معايير الأمان المعتمدة قبل محاولة إخماد الحريق؟',
            contextEn: 'The microwave cord is plugged into the wall, and small flames are touching napkins on the counter.',
            contextAr: 'سلك الميكروويف موصول بالجدار، واللهب الصغير يلامس مناديل ورقية على طاولة المطبخ.',
            options: [
              {
                id: 'fs_1_a',
                textEn: 'Verify fire is smaller than a bin, suppressible under 60 seconds, with an unblocked exit path behind.',
                textAr: 'التأكد أن الحريق أصغر من سلة المهملات، ويمكن إطفاؤه في أقل من 60 ثانية، ومسار الخروج خلفك مفتوح.',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Correct! The 3 core criteria (wastebin size, under 60 seconds, clear exit route) govern safe incipient suppression.',
                feedbackAr: 'صحيح ومثالي! المعايير الثلاثة (حجم سلة مهملات، أقل من 60 ثانية، مسار هروب مؤمن خلفك) تحدد الأمان.'
              },
              {
                id: 'fs_1_b',
                textEn: 'Discharge the extinguisher immediately into the kitchen while standing between the flames and the back wall.',
                textAr: 'تفريغ المطفأة فوراً داخل المطبخ مع الوقوف بين النيران والجدار الداخلي المعزول.',
                isCorrect: false,
                score: 20,
                dangerFlag: true,
                feedbackEn: 'Dangerous positioning! Never place yourself in a position where flames block your escape door.',
                feedbackAr: 'تموضع خطير! لا تقف أبداً بحيث تصبح النيران بينك وبين باب الخروج من الغرفة.'
              },
              {
                id: 'fs_1_c',
                textEn: 'Attempt continuous suppression until all available floor extinguishers are completely exhausted regardless of room smoke.',
                textAr: 'مواصلة محاولات الإطفاء حتى نفاد جميع مطافئ الدور بالكامل بغض النظر عن كثافة الدخان المتصاعد.',
                isCorrect: false,
                score: 25,
                feedbackEn: 'If a fire cannot be knocked down in under 60 seconds with 1 extinguisher, escalate and evacuate immediately.',
                feedbackAr: 'إذا لم يخمد الحريق في أقل من دقيقة بمطفأة واحدة، يجب التراجع فوراً وإغلاق الباب والإخلاء.'
              },
              {
                id: 'fs_1_d',
                textEn: 'Throw thick wet synthetic blankets over the plugged-in microwave to smother the flames without extinguishers.',
                textAr: 'إلقاء بطانيات بوليستر مبللة بالماء فوق الميكروويف الموصول بالكهرباء لمحاولة خنقه دون مطفأة.',
                isCorrect: false,
                score: 15,
                dangerFlag: true,
                feedbackEn: 'Synthetic fabrics melt and water on energized electrical components creates violent shock hazards.',
                feedbackAr: 'الأقمشة الاصطناعية تذوب وتشتعل، وسكب الماء على أجهزة كهربائية موصولة يحدث صعقاً قاتلاً.'
              }
            ]
          },
          casualtyCare: {
            roleId: 'casualtyCare',
            questionEn: 'How should Casualty Care assist the coughing worker near the pantry?',
            questionAr: 'كيف يتعامل مسؤول الإسعافات مع الموظف الذي يسعل قرب باب المطبخ؟',
            contextEn: 'The colleague inhaled smoke while escaping and is coughing with watery eyes.',
            contextAr: 'استنشق الموظف بعض الدخان أثناء خروجه وهو يسعل وتدمع عيناه.',
            options: [
              {
                id: 'cc_1_a',
                textEn: 'Administer an over-the-counter cough syrup dose from your personal bag inside the smoky corridor.',
                textAr: 'إعطاء المصاب جرعة شراب كحة من حقيبتك الشخصية داخل الممر الممتلئ بالدخان لتهدئة السعال.',
                isCorrect: false,
                score: 20,
                dangerFlag: true,
                feedbackEn: 'Unprescribed oral medication in smoky areas delays evacuation and risks aspiration.',
                feedbackAr: 'إعطاء أدوية شخصية غير مصرح بها داخل ممر مدخن يؤخر الإخلاء ويعرض المريض للتشردق.'
              },
              {
                id: 'cc_1_b',
                textEn: 'Have the coughing worker lie flat on the corridor carpet and wait for building safety to arrive.',
                textAr: 'الطلب من الموظف الاستلقاء على سجادة الممر والانتظار حتى وصول مسؤولي سلامة المبنى.',
                isCorrect: false,
                score: 25,
                feedbackEn: 'Leaving an inhalation casualty on the floor in a smoke-affected path exposes them to rising toxic gases.',
                feedbackAr: 'إبقاء المصاب مستلقياً على الأرض في مسار الدخان يعرضه لاستنشاق الغازات السامة المتزايدة.'
              },
              {
                id: 'cc_1_c',
                textEn: 'Escort the colleague to fresh air, reassure them, and assess their breathing comfort.',
                textAr: 'مرافقة الموظف إلى مكان به هواء نقي بعيداً عن الدخان، وتهدئته وفحص سهولة تنفسه.',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Correct! Fresh air and rapid airway evaluation are the primary first aid steps.',
                feedbackAr: 'صحيح ومثالي! نقل المصاب للهواء النقي والتأكد من سلامة مجرى التنفس هما الخطوة الأولى.'
              },
              {
                id: 'cc_1_d',
                textEn: 'Advise the employee to return to their desk if they can still speak in complete sentences.',
                textAr: 'نصح الموظف بالعودة لمكتبه ومتابعة العمل طالما أنه قادر على التحدث بجمل كاملة.',
                isCorrect: false,
                score: 15,
                feedbackEn: 'Toxic smoke inhalation symptoms can deteriorate rapidly; casualties must always be evacuated to fresh air.',
                feedbackAr: 'أعراض استنشاق الدخان قد تتدهور فجأة؛ يجب إخراج أي مصاب إلى الهواء النقي فوراً.'
              }
            ]
          },
          evacuation: {
            roleId: 'evacuation',
            questionEn: 'What is the priority for Evacuation in this open office section?',
            questionAr: 'ما هي الأولوية لمسؤول الإخلاء في هذا القسم من المكاتب المفتوحة؟',
            contextEn: 'Around 20 coworkers are standing up; some are trying to pack their laptop bags.',
            contextAr: 'حوالي 20 موظفاً يقفون، وبعضهم يحاول جمع حقائب أجهزتهم المحمولة وأغراضهم الشخصية.',
            options: [
              {
                id: 'ev_1_a',
                textEn: 'Permit employees three minutes to power down desktops and secure paper files into locked cabinets.',
                textAr: 'السماح للموظفين بثلاث دقائق لإيقاف تشغيل حواسيبهم وإيداع الملفات الورقية في الخزائن.',
                isCorrect: false,
                score: 25,
                feedbackEn: 'Delays for administrative filing risk trapping workers as smoke spreads into the corridor.',
                feedbackAr: 'تأخير الإخلاء لحفظ الأوراق والملفات يعرض الموظفين لخطر الحصار مع انتشار الدخان.'
              },
              {
                id: 'ev_1_b',
                textEn: 'Direct staff firmly to leave belongings behind and proceed toward Stairwell Exit A.',
                textAr: 'توجيه الموظفين بحزم بترك الأغراض الشخصية والتحرك مباشرة نحو مخرج الدرج (أ).',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Correct! Preventing packing delays ensures fast, unobstructed egress before smoke thickens.',
                feedbackAr: 'صحيح ومثالي! منع جمع الأغراض يسرع الخروج ويمنع تكدس الممرات بالحقائب.'
              },
              {
                id: 'ev_1_c',
                textEn: 'Instruct all occupants to form a tight single-file line and wait for executive managers to lead the queue.',
                textAr: 'توجيه الموظفين بالاصطفاف في طابور فردي ضيق والانتظار حتى يتقدم المدراء التنفيذيون الطابور.',
                isCorrect: false,
                score: 20,
                feedbackEn: 'Artificial delays waiting for hierarchical leadership obstruct immediate emergency egress.',
                feedbackAr: 'انتظار التسلسل الإداري في الطوارئ يعطل الإخلاء الفوري ويعرض الأرواح للخطر.'
              },
              {
                id: 'ev_1_d',
                textEn: 'Hold staff in the central meeting area until security guards confirm which exit stairwell is active.',
                textAr: 'حجز الموظفين في منطقة الاجتماعات المركزية حتى يؤكد حراس الأمن أي درج طوارئ يعمل.',
                isCorrect: false,
                score: 20,
                feedbackEn: 'Holding occupants in centralized rooms creates crowd bottlenecks; use designated clear primary exits.',
                feedbackAr: 'تجميع الموظفين في غرف داخلية يخلق تكدساً خطيراً؛ يجب توجيههم فوراً للمخارج الآمنة.'
              }
            ]
          },
          communications: {
            roleId: 'communications',
            questionEn: 'How should Communications transmit the mandatory LNNH report to AOCC?',
            questionAr: 'كيف يرسل مسؤول الاتصالات بلاغ (LNNH) الإلزامي لمركز عمليات المطار؟',
            contextEn: 'You are on the line with the Airport Operations Control Center (AOCC) emergency desk.',
            contextAr: 'أنت الآن على الخط المباشر مع مكتب طوارئ مركز عمليات المطار (AOCC).',
            options: [
              {
                id: 'cm_1_a',
                textEn: 'Transmit: Admin Building Floor 2 (L), Kitchen Fire (N), Please send help quickly as we are worried.',
                textAr: 'إرسال: مبنى الإدارة الدور الثاني (الموقع)، حريق مطبخ (النوع)، أرسلوا المساعدة سريعاً لأننا قلقون.',
                isCorrect: false,
                score: 30,
                feedbackEn: 'Incomplete LNNH: Omits occupant headcount and specific smoke hazards in corridor.',
                feedbackAr: 'تقرير LNNH ناقص: أهمل ذكر أعداد الموظفين والمخاطر المحددة في الممر.'
              },
              {
                id: 'cm_1_b',
                textEn: 'Transmit: Admin Building (L), Fire confirmed (N), 22 occupants on floor (N), send fire brigade.',
                textAr: 'إرسال: مبنى الإدارة (الموقع)، حريق مؤكد (النوع)، 22 موظفاً بالدور (العدد)، أرسلوا الإطفاء.',
                isCorrect: false,
                score: 30,
                feedbackEn: 'Incomplete LNNH: Lacks specific room location and identification of prevailing hazards.',
                feedbackAr: 'تقرير LNNH غير مكتمل: يفتقر للموقع الدقيق داخل المبنى وتحديد المخاطر الحالية.'
              },
              {
                id: 'cm_1_c',
                textEn: 'Transmit: Admin Bldg Floor 2 Pantry (L), Appliance Fire (N), 22 Staff Evacuating (N), Smoke in Corridor (H).',
                textAr: 'إرسال: مبنى الإدارة دور 2 مطبخ (الموقع)، حريق جهاز (النوع)، 22 موظفاً يخلون (العدد)، دخان بالممر (الخطر).',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Spot on! Full LNNH sequence gives emergency dispatch all facts needed to mobilize assets.',
                feedbackAr: 'دقة واحترافية عالية! بلاغ LNNH المكتمل (الموقع، النوع، الأعداد، المخاطر) يتيح توجيه الدعم فوراً.'
              },
              {
                id: 'cm_1_d',
                textEn: 'Transmit: Floor 2 Pantry (L), Smoke alert (N), Everyone moving out safely, no further issues.',
                textAr: 'إرسال: مطبخ الدور 2 (الموقع)، إنذار دخان (النوع)، الجميع يخرج بأمان ولا توجد مشاكل أخرى.',
                isCorrect: false,
                score: 25,
                feedbackEn: 'Fails LNNH: Missing building identity, exact numbers, and electrical hazard details.',
                feedbackAr: 'مخالف لمعيار LNNH: أهمل اسم المبنى والأعداد الدقيقة وتفاصيل المخاطر الكهربائية.'
              }
            ]
          }
        }
      },
      {
        id: 'pantry_s2',
        stageNumber: 2,
        stageTitleEn: 'Stage 2: Corridor Smoke Clearing & Sensory Support',
        stageTitleAr: 'المرحلة 2: إخلاء الممرات ومساندة ذوي الحساسية الحسية',
        situationEn: 'The microwave fire is knocked down, but dense smoke triggered hallway alarms with loud screeching sirens. A colleague with sensory processing sensitivity has frozen in place, overwhelmed by the loud strobes and noise.',
        situationAr: 'تم إخماد الحريق لكن الدخان ملأ الممر وانطلقت صفارات الإنذار القوية، مما أصاب زميلاً ذا حساسية حسية بنوبة هلع وتجمد مكانه بسبب الضجيج العالي والأضواء الوامضة.',
        decisions: {
          teamLeader: {
            roleId: 'teamLeader',
            questionEn: 'How should the Team Leader handle the visitor trying to re-enter the smoke envelope?',
            questionAr: 'كيف يتعامل قائد الفريق مع الزائر الذي يحاول العودة لمنطقة الدخان؟',
            contextEn: 'A visiting contractor is attempting to rush back inside to grab a laptop bag with building security keys.',
            contextAr: 'يحاول مقاول زائر الاندفاع مجدداً لداخل الممر المدخن لجلب حقيبة كمبيوتر تحتوي على مفاتيح أمنية.',
            options: [
              {
                id: 'tl_2_a',
                textEn: 'Allow the contractor 45 seconds to retrieve the security keys if accompanied by an ERT member.',
                textAr: 'السماح للمقاول بـ 45 ثانية لجلب المفاتيح الأمنية برفقة أحد أعضاء فريق الطوارئ.',
                isCorrect: false,
                score: 20,
                dangerFlag: true,
                feedbackEn: 'Re-entry into smoke zones violates safety regulations; civilian property never supersedes life safety.',
                feedbackAr: 'إعادة الدخول لمنطقة الدخان محظورة نظاماً؛ لا يجوز المخاطرة بالأرواح من أجل مقتنيات مادية.'
              },
              {
                id: 'tl_2_b',
                textEn: 'Send the Fire Suppression lead back inside the smoke zone to search for the contractor\'s bag.',
                textAr: 'إرسال مسؤول الإطفاء للداخل للبحث عن حقيبة المقاول بدلاً عنه لتقليل الخطر.',
                isCorrect: false,
                score: 20,
                dangerFlag: true,
                feedbackEn: 'ERT personnel must never conduct property recovery operations inside unvented smoke zones.',
                feedbackAr: 'يُحظر على أعضاء فريق الطوارئ الدخول لاسترجاع مفقودات مادية داخل مناطق الدخان.'
              },
              {
                id: 'tl_2_c',
                textEn: 'Block re-entry firmly, explain that life safety comes first, and escort them down the exit stairs.',
                textAr: 'منع العودة بحزم، والتوضيح أن السلامة هي الأولوية، ومرافقة الزائر نحو درج الخروج.',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Correct! Strict re-entry prohibition is mandatory until Civil Defense issues an official All-Clear.',
                feedbackAr: 'صحيح ومثالي! منع العودة لمبنى الطوارئ إلزامي حتى صدور تصريح رسمي من الدفاع المدني.'
              },
              {
                id: 'tl_2_d',
                textEn: 'Instruct building security to disable all fire alarms so the contractor can locate the bag quietly.',
                textAr: 'الطلب من أمن المبنى إطفاء صفارات الإنذار لكي يتمكن المقاول من العثور على حقيبته بهدوء.',
                isCorrect: false,
                score: 0,
                dangerFlag: true,
                feedbackEn: 'Disabling alarms during an active incident severely endangers building-wide occupants.',
                feedbackAr: 'إيقاف أجهزة الإنذار أثناء حادث نشط يعد خطأ كارثياً يعرض كافة سكان المبنى للخطر.'
              }
            ]
          },
          evacuation: {
            roleId: 'evacuation',
            questionEn: 'How should Evacuation assist the colleague with sensory processing sensitivity frozen by alarm sirens?',
            questionAr: 'كيف يساند مسؤول الإخلاء الزميل ذا الحساسية الحسية الذي تجمد في مكانه بسبب ضجيج صفارات الإنذار؟',
            contextEn: 'The colleague is covering their ears, trembling, and unable to move due to the screeching alarms and strobes.',
            contextAr: 'الموظف يضع يديه على أذنيه ويرتجف وغير قادر على الحركة بسبب صوت الإنذار العالي والأضواء القوية.',
            options: [
              {
                id: 'ev_2_a',
                textEn: 'Grab the colleague firmly by the wrist and pull them briskly down the corridor into the noisy stairwell.',
                textAr: 'الإمساك بمعصم الموظف بقوة وسحبه بسرعة عبر الممر وإدخاله في الدرج الصاخب.',
                isCorrect: false,
                score: 20,
                dangerFlag: true,
                feedbackEn: 'Physical pulling during sensory overload triggers acute panic paralysis or combative distress.',
                feedbackAr: 'السحب الجسدي بالقوة أثناء التحسس الحسي يسبب صدمة عصبية حادة ومقاومة لا إرادية.'
              },
              {
                id: 'ev_2_b',
                textEn: 'Shout louder than the sirens into their ear demanding they obey immediate evacuation orders.',
                textAr: 'الصراخ في أذن الموظف بصوت أعلى من صفارات الإنذار ومطالبته بالامتثال الفوري لأوامر الإخلاء.',
                isCorrect: false,
                score: 15,
                feedbackEn: 'Shouting compounds auditory overload and deepens neurological distress.',
                feedbackAr: 'الصراخ يزيد من الحمل الحسي السمعي ويفاقم حالة الشلل الحركي لدى المصاب.'
              },
              {
                id: 'ev_2_c',
                textEn: 'Approach calmly at eye level, offer noise-dampening ear protection, use short gentle phrases, and guide them via a calmer exit.',
                textAr: 'الاقتراب بهدوء بمستوى نظره، وتقديم واقي أذن عازل، واستخدام عبارات قصيرة ومطمئنة، وإرشاده عبر مخرج أكثر هدوءاً.',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Exemplary neuro-inclusive ERT practice! Reducing sensory input and calm communication restores voluntary movement.',
                feedbackAr: 'ممارسة احترافية ومثالية! تقليل المثيرات الحسية والتحدث الهادئ المطمئن يعيدان للموظف القدرة على الحركة.'
              },
              {
                id: 'ev_2_d',
                textEn: 'Leave the colleague in the open corridor and inform emergency crews once you reach the parking lot.',
                textAr: 'ترك الموظف في الممر المفتوح والانتظار حتى النزول لمواقف السيارات لإبلاغ فرق الطوارئ عنه.',
                isCorrect: false,
                score: 15,
                dangerFlag: true,
                feedbackEn: 'Never abandon distressed occupants in active smoke zones; adapt communication and provide direct escort.',
                feedbackAr: 'يُحظر ترك أي زميل في منطقة خطر الدخان؛ يجب تكييف أسلوب التواصل ومرافقته للخروج بأمان.'
              }
            ]
          },
          fireSuppression: {
            roleId: 'fireSuppression',
            questionEn: 'What is the Fire Suppression lead\'s duty after extinguishing the microwave flames?',
            questionAr: 'ما هو واجب مسؤول الإطفاء بعد إخماد لهب الميكروويف مباشرة؟',
            contextEn: 'Flames are out, but the microwave is still smoldering and the pantry door is wide open.',
            contextAr: 'انطفأ اللهب، لكن الجهاز ما زال يخرج دخاناً خفيفاً وباب المطبخ مفتوح على مصراعيه.',
            options: [
              {
                id: 'fs_2_a',
                textEn: 'Close the fire-rated pantry door to compartmentalize the room and stop smoke from spreading.',
                textAr: 'إغلاق باب المطبخ المقاوم للحريق لحصر الدخان ومنع انتشاره في ممرات المكاتب.',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Correct! Closing compartment doors contains smoke and protects the corridor egress route.',
                feedbackAr: 'صحيح ومثالي! إغلاق أبواب العزل يحصر الدخان ويحمي مسار هروب الموظفين بالممر.'
              },
              {
                id: 'fs_2_b',
                textEn: 'Prop the pantry door wide open with a trash can to let fresh air blow the smoke into cubicles.',
                textAr: 'تثبيت باب المطبخ مفتوحاً بسلة مهملات لتهوية الدخان باتجاه مكاتب الموظفين المجاورة.',
                isCorrect: false,
                score: 20,
                dangerFlag: true,
                feedbackEn: 'Propping open fire doors vents toxic smoke directly into occupied office zones.',
                feedbackAr: 'إبقاء باب الحريق مفتوحاً يلوث المكاتب المجاورة بالغازات السامة ويعطل الحماية الهيكلية.'
              },
              {
                id: 'fs_2_c',
                textEn: 'Leave the pantry door slightly ajar so building security can monitor the room from the main corridor.',
                textAr: 'ترك باب المطبخ موارباً جزئياً لكي يتمكن أمن المبنى من مراقبة الغرفة من الممر الرئيسي.',
                isCorrect: false,
                score: 25,
                feedbackEn: 'Fire doors must be completely latched shut; gaps allow buoyant smoke to escape into egress corridors.',
                feedbackAr: 'أبواب الحريق يجب أن تغلق بإحكام؛ أي فتحة تسمح بتسرب الدخان الساخن إلى ممرات الهروب.'
              },
              {
                id: 'fs_2_d',
                textEn: 'Carry the smoldering microwave through the hallway to toss it into the outdoor courtyard.',
                textAr: 'حمل الميكروويف الذي لا يزال يدخن والمشي به عبر الممر لإلقائه في الفناء الخارجي.',
                isCorrect: false,
                score: 15,
                dangerFlag: true,
                feedbackEn: 'Carrying hot smoldering appliances through corridors risks burns and ignites furniture along the route.',
                feedbackAr: 'نقل أجهزة محترقة عبر الممرات يهدد بإصابة المنقذ بالحروق ونقل النيران لأثاث المكاتب.'
              }
            ]
          },
          casualtyCare: {
            roleId: 'casualtyCare',
            questionEn: 'How should Casualty Care monitor the coughing staff member during stairwell egress?',
            questionAr: 'كيف يتابع مسؤول الإسعافات الموظف الذي يسعل أثناء النزول عبر الدرج؟',
            contextEn: 'You are walking down Stairwell A alongside the affected colleague who feels slightly dizzy.',
            contextAr: 'أنت تنزل عبر الدرج بجانب الموظف المتأثر بالدخان، وهو يشعر بدوار خفيف.',
            options: [
              {
                id: 'cc_2_a',
                textEn: 'Have the dizzy person descend ahead independently while you observe their progress from three steps behind.',
                textAr: 'الطلب من الموظف النزول بمفرده للأمام بينما تكتفي أنت بمراقبته من مسافة ثلاث درجات بالخلف.',
                isCorrect: false,
                score: 25,
                feedbackEn: 'Dizzy casualties easily lose balance; active physical contact along handrails is mandatory.',
                feedbackAr: 'المصاب بالدوار معرض لفقدان توازنه فجأة؛ المساندة الجسدية المباشرة بجانب الدرابزين إلزامية.'
              },
              {
                id: 'cc_2_b',
                textEn: 'Keep physical contact, walk on their descent side for balance, and recheck breathing outside.',
                textAr: 'مساندة الموظف بمسك ذراعه لحفظ توازنه، وإعادة فحص تنفسه فور الوصول للخارج.',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Correct! Physical support prevents falls down stairs, and continuous observation detects shock.',
                feedbackAr: 'صحيح ومثالي! مساندة المصاب تمنع سقوطه على الدرج ومتابعة حالته تكشف أي مضاعفات.'
              },
              {
                id: 'cc_2_c',
                textEn: 'Instruct the colleague to sit on the stair landing until the entire building is empty before resuming.',
                textAr: 'توجيه الموظف بالجلوس على بسطة الدرج حتى يفرغ المبنى بالكامل قبل مواصلة النزول.',
                isCorrect: false,
                score: 20,
                feedbackEn: 'Sitting on stair landings blocks egress columns and exposes the casualty to stairwell smoke migration.',
                feedbackAr: 'الجلوس على بسطات الدرج يعيق تدفق الموظفين النازلين ويعرض المصاب لتراكم الدخان بالبئر.'
              },
              {
                id: 'cc_2_d',
                textEn: 'Encourage the worker to breathe shallowly and quickly to limit the amount of stairwell air inhaled.',
                textAr: 'تشجيع الموظف على التنفس السريع والسطحي لتقليل كمية هواء الدرج المستنشقة.',
                isCorrect: false,
                score: 15,
                feedbackEn: 'Rapid shallow breathing causes hyperventilation and acute respiratory distress.',
                feedbackAr: 'التنفس السطحي السريع يسبب فرط التنفس والدوخة الشديدة ونقص الأكسجين في الدم.'
              }
            ]
          },
          communications: {
            roleId: 'communications',
            questionEn: 'How should Communications transmit the updated LNNH report from the Assembly Point?',
            questionAr: 'كيف يرسل مسؤول الاتصالات تقرير LNNH المحدث من نقطة التجمع الخارجية؟',
            contextEn: 'You reach the designated Ground Assembly Point outside with the floor warden headcount.',
            contextAr: 'وصلت إلى نقطة التجمع الخارجية المعتمدة ومعك كشف حصر الموظفين من مسؤول الإخلاء.',
            options: [
              {
                id: 'cm_2_a',
                textEn: 'Transmit: Floor 2 Assembly Point (L), Fire extinguished (N), muster complete, no hazards reported.',
                textAr: 'إرسال: نقطة تجمع الدور 2 (الموقع)، الحريق أطفئ (النوع)، اكتمال التجمع، ولا توجد مخاطر.',
                isCorrect: false,
                score: 30,
                feedbackEn: 'Lacks specific building identity and exact headcount numbers required by LNNH standard.',
                feedbackAr: 'يفتقر لاسم المبنى المحدد والأعداد الفعلية الدقيقة للموظفين التي يفرضها معيار LNNH.'
              },
              {
                id: 'cm_2_b',
                textEn: 'Transmit: Admin Bldg Floor 2 Assembly Point (L), Fire Out Smoke Clearing (N), 22 Staff Accounted (N), Zero Additional Hazards (H).',
                textAr: 'إرسال: نقطة تجمع مبنى الإدارة (الموقع)، الحريق أخمد والدخان يتبدد (النوع)، حصر 22 موظفاً بالكامل (العدد)، لا توجد مخاطر إضافية (الخطر).',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Outstanding! The updated LNNH confirms everyone is safe and the primary hazard is suppressed.',
                feedbackAr: 'رائع جداً! تحديث تقرير LNNH يؤكد اكتمال حصر الجميع وخلو الموقع من المخاطر.'
              },
              {
                id: 'cm_2_c',
                textEn: 'Transmit: Parking area (L), all staff evacuated (N), waiting for building clearance from facilities.',
                textAr: 'إرسال: منطقة المواقف (الموقع)، إخلاء كافة الموظفين (النوع)، بانتظار تصريح المبنى من الصيانة.',
                isCorrect: false,
                score: 25,
                feedbackEn: 'Omits operational fire status, exact building name, and numerical personnel headcount.',
                feedbackAr: 'أهمل حالة الحريق الميدانية واسم المبنى بدقة والعدد الرقمي المحصور للموظفين.'
              },
              {
                id: 'cm_2_d',
                textEn: 'Transmit: Admin Building (L), 22 occupants outside (N), incident resolved, closing channel.',
                textAr: 'إرسال: مبنى الإدارة (الموقع)، 22 موظفاً بالخارج (العدد)، الحادث انتهى، إغلاق القناة.',
                isCorrect: false,
                score: 25,
                feedbackEn: 'Premature channel closure without articulating fire suppression status and assembly sector hazards.',
                feedbackAr: 'إغلاق مبكر للقناة دون توضيح حالة الإخماد وموقع التجمع وخلوه من المخاطر.'
              }
            ]
          }
        }
      }
    ]
  },

  // =========================================================================
  // SCENARIO 2: LEVEL 2 (MODERATE) - OPEN OFFICE MEDICAL COLLAPSE & AED
  // =========================================================================
  {
    id: 'medical_fainting',
    level: 2,
    difficulty: 'Moderate',
    difficultyAr: 'المستوى 2: متوسط',
    titleEn: 'Sudden Medical Collapse in Open Office Bay',
    titleAr: 'سقوط وإغماء مفاجئ لزميل في صالة المكاتب المفتوحة',
    locationEn: 'Finance & Procurement Wing - Open Workstation Bay 3',
    locationAr: 'إدارة المالية والمشتريات - صالة المكاتب المفتوحة رقم 3',
    occupants: 38,
    descriptionEn: 'During peak morning hours, an employee collapsed from their chair onto the floor. The employee is unresponsive and breathing is abnormally shallow.',
    descriptionAr: 'خلال ساعات الصباح، سقط موظف من كرسيه أرضاً وفقد الوعي تماماً، وأصبح تنفسه ضعيفاً وغير طبيعي.',
    hazardsEn: ['Unresponsive casualty', 'Crowd anxiety blocking fresh air', 'Potential cardiac arrest'],
    hazardsAr: ['مصاب فاقد للوعي', 'تجمهر الزملاء مما يحجب الهواء', 'اشتباه بأزمة قلبية حادة'],
    casualtiesEn: '1 Employee (Unresponsive, agonal gasping, pulse faint)',
    casualtiesAr: 'موظف واحد (فاقد للوعي، تنفس متقطع وضعيف)',
    visualType: 'medical_collapse',
    stages: [
      {
        id: 'med_s1',
        stageNumber: 1,
        stageTitleEn: 'Stage 1: Immediate Assessment & Hands-Only CPR Initiation',
        stageTitleAr: 'المرحلة 1: التقييم الأولي وبدء الإنعاش القلبي بالضغطات فقط',
        situationEn: 'Around 15 anxious colleagues are crowded shoulder-to-shoulder around the fallen employee. Some are screaming, others are offering conflicting advice.',
        situationAr: 'تجمهر حوالي 15 موظفاً بارتباك حول الزميل الساقط، وبعضهم يصرخ بينما يقدم آخرون نصائح متضاربة.',
        decisions: {
          casualtyCare: {
            roleId: 'casualtyCare',
            questionEn: 'What is the immediate life-saving CPR protocol for this unresponsive colleague?',
            questionAr: 'ما هو البروتوكول الإسعافي المعتمد فوراً لإنعاش هذا الزميل الفاقد للوعي؟',
            contextEn: 'You confirm the person is unresponsive and breathing is abnormal/agonal. You must start CPR.',
            contextAr: 'تأكدت أن المصاب فاقد للوعي وتنفسه غير طبيعي/متقطع. يجب بدء الإنعاش فوراً.',
            options: [
              {
                id: 'cc_med1_a',
                textEn: 'Perform mouth-to-mouth rescue breathing first for two minutes before initiating any chest compressions.',
                textAr: 'البدء بالتنفس الاصطناعي فماً لفم أولاً لمدة دقيقتين كاملتين قبل إجراء أي ضغطات صدرية.',
                isCorrect: false,
                score: 20,
                feedbackEn: 'Outdated and incorrect! Office ERT protocol mandates continuous Hands-Only compressions with NO mouth-to-mouth breaths.',
                feedbackAr: 'غير صحيح ومخالف للمعايير الحديثة! بروتوكول طوارئ المكاتب يلزم بالضغطات الصدرية المستمرة فقط دون تنفس فموي.'
              },
              {
                id: 'cc_med1_b',
                textEn: 'Deliver 15 gentle compressions alternating with pulse checks at the neck every 30 seconds.',
                textAr: 'إجراء 15 ضغطة خفيفة مع التوقف كل 30 ثانية لفحص النبض السباتي في الرقبة.',
                isCorrect: false,
                score: 25,
                feedbackEn: 'Frequent pulse interruptions drop perfusion pressure; deliver continuous uninterrupted compressions.',
                feedbackAr: 'التوقف المتكرر لفحص النبض يخفض ضغط تروية الدماغ للصفر؛ يجب الاستمرار في الضغط دون انقطاع.'
              },
              {
                id: 'cc_med1_c',
                textEn: 'Deliver continuous Hands-Only compressions (100–120 bpm, 5–6 cm depth, NO rescue breaths) and send for the AED.',
                textAr: 'بدء إنعاش بالضغطات الصدرية فقط (100-120 ضغطة/دقيقة، عمق 5-6 سم، بدون تنفس اصطناعي) وطلب جهاز AED فوراً.',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Correct! Modern workplace standard: Hands-Only CPR (continuous, 100-120 bpm, hard and fast, NO breaths) until AED arrives.',
                feedbackAr: 'صحيح ومثالي! معيار طوارئ العمل الحديث: إنعاش بالضغطات فقط (مستمر، 100-120 بالدقيقة، عمق 5-6 سم، بدون تنفس) حتى وصول AED.'
              },
              {
                id: 'cc_med1_d',
                textEn: 'Place the casualty in the recovery position on their side and wait for the AED before touching the chest.',
                textAr: 'وضع المصاب في وضع الإفاقة الجانبي والانتظار حتى وصول جهاز الصدمات قبل لمس الصدر.',
                isCorrect: false,
                score: 20,
                feedbackEn: 'An unresponsive patient with abnormal/agonal breathing is in cardiac arrest; recovery position delays life-saving compressions.',
                feedbackAr: 'المصاب فاقد الوعي بتنفس متقطع يعتبر في حالة توقف قلب؛ وضع الإفاقة يؤخر الضغطات الصدرية المنقذة للحياة.'
              }
            ]
          },
          teamLeader: {
            roleId: 'teamLeader',
            questionEn: 'How should the Team Leader take command of this frantic medical scene?',
            questionAr: 'كيف يفرض قائد الفريق السيطرة على هذا المشهد الطبي المرتبك؟',
            contextEn: 'People are standing too close, blocking air and shouting at the casualty.',
            contextAr: 'الناس يقفون على مسافة قريبة جداً مما يحجب الهواء ويصرخون في وجه المصاب.',
            options: [
              {
                id: 'tl_med1_a',
                textEn: 'Direct onlookers calmly to step back three meters to allow air and dispatch ERT members.',
                textAr: 'توجيه الحاضرين بهدوء للتراجع ثلاثة أمتار لتوفير الهواء وتكليف أعضاء فريق الطوارئ.',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Correct! Clearing a 3-meter perimeter restores air circulation and gives responders room to work.',
                feedbackAr: 'صحيح ومثالي! إرجاع المتجمهرين 3 أمتار يوفر الهواء النقي ويتيح للمسعفين التحرك بحرية.'
              },
              {
                id: 'tl_med1_b',
                textEn: 'Take over manual chest compressions yourself while simultaneously attempting to coordinate dispatch calls.',
                textAr: 'تولي إجراء الضغطات الصدرية بنفسك يدوياً بينما تحاول في نفس الوقت التنسيق عبر اللاسلكي.',
                isCorrect: false,
                score: 25,
                feedbackEn: 'Commanders must maintain global oversight; engaging in hands-on care collapses incident command.',
                feedbackAr: 'يجب على القائد الحفاظ على النظرة الشاملة للموقف؛ الانشغال بالضغط اليدوي يفقد الفريق التنسيق والقيادة.'
              },
              {
                id: 'tl_med1_c',
                textEn: 'Order all 38 office workers to vacate the building entirely and assemble in the outdoor parking area.',
                textAr: 'أمر جميع موظفي الدور الـ 38 بإخلاء المبنى بالكامل والتجمع في مواقف السيارات الخارجية.',
                isCorrect: false,
                score: 20,
                feedbackEn: 'A localized medical incident requires perimeter crowd control, not full structural evacuation.',
                feedbackAr: 'الحالة الطبية الفردية تتطلب إدارة التجمهر وإفساح المجال، وليس إخلاء المبنى بالكامل للشارع.'
              },
              {
                id: 'tl_med1_d',
                textEn: 'Ask the gathered crowd to vote by show of hands whether an ambulance is necessary.',
                textAr: 'الطلب من الحاضرين التصويت برفع الأيدي لتحديد ما إذا كان استدعاء الإسعاف ضرورياً.',
                isCorrect: false,
                score: 15,
                feedbackEn: 'Emergency medical activation is mandatory and immediate, never subject to group voting.',
                feedbackAr: 'طلب الإسعاف في حالات الإغماء إلزامي وفوري ولا يخضع لأي تصويت أو تردد.'
              }
            ]
          },
          fireSuppression: {
            roleId: 'fireSuppression',
            questionEn: 'How can Fire Suppression best support the team during this medical event?',
            questionAr: 'كيف يساهم مسؤول الإطفاء بأفضل شكل في دعم الفريق أثناء هذه الحالة الطبية؟',
            contextEn: 'Office rolling chairs, computer cables, and trash bins surround the casualty area.',
            contextAr: 'تحيط بموقع المصاب كراسٍ متحركة وأسلاك كمبيوتر أرضية وسلات مهملات تعيق الحركة.',
            options: [
              {
                id: 'fs_med1_a',
                textEn: 'Retrieve a dry chemical fire extinguisher and keep the nozzle unpinned directly over the casualty.',
                textAr: 'إحضار مطفأة حريق كيميائية جافة وإبقاء فوهتها جاهزة وموجهة فوق المصاب مباشرة.',
                isCorrect: false,
                score: 15,
                feedbackEn: 'Dry chemical powder has no application in medical events and creates choking dust hazards.',
                feedbackAr: 'مطفأة الحريق لا فائدة منها في الحوادث الطبية ومسحوقها الكيميائي يخنق المريض والحاضرين.'
              },
              {
                id: 'fs_med1_b',
                textEn: 'Clear office chairs, waste bins, and floor cables to create a wide corridor for stretchers.',
                textAr: 'إزاحة الكراسي وسلات المهملات والأسلاك لفتح مسار عريض وممهد لدخول نقالة الإسعاف.',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Correct! Clearing obstacles allows paramedics to roll their emergency gear without delay.',
                feedbackAr: 'صحيح ومثالي! إخلاء العوائق يتيح للمسعفين إدخال النقالة ومعدات الإنعاش دون أي تأخير.'
              },
              {
                id: 'fs_med1_c',
                textEn: 'Unroll an indoor fire hose across the cubicle aisle to mark off a sterile boundary line.',
                textAr: 'فرد خرطوم إطفاء داخلي عبر ممر المكاتب لتحديد خط فاصل وهمي حول منطقة المصاب.',
                isCorrect: false,
                score: 20,
                feedbackEn: 'Unrolling heavy fire hoses creates severe trip hazards for arriving paramedic stretchers.',
                feedbackAr: 'فرد خراطيم المياه يخلق عائقاً أرضياً خطيراً يعطل دخول نقالة الإسعاف السريع.'
              },
              {
                id: 'fs_med1_d',
                textEn: 'Switch off the primary floor electrical breaker, cutting all lighting across the entire department.',
                textAr: 'فصل القاطع الكهربائي الرئيسي للدور وإطفاء كافة أنوار الإنارة في القسم بالكامل.',
                isCorrect: false,
                score: 15,
                dangerFlag: true,
                feedbackEn: 'Cutting room lighting plunges the medical team into darkness, hindering life-saving care.',
                feedbackAr: 'فصل الإنارة يغرق المكان في الظلام ويعيق رؤية المسعف أثناء تقديم الإنعاش القلبي.'
              }
            ]
          },
          evacuation: {
            roleId: 'evacuation',
            questionEn: 'What vital logistic role should Evacuation execute right now?',
            questionAr: 'ما هي المهمة اللوجستية الحيوية التي يجب على مسؤول الإخلاء تنفيذها الآن؟',
            contextEn: 'Airport paramedics have been dispatched and are arriving at the ground entrance.',
            contextAr: 'طاقم إسعاف المطار في طريقهم الآن ويقتربون من بوابة المبنى الرئيسية.',
            options: [
              {
                id: 'ev_med1_a',
                textEn: 'Pull the manual fire alarm lever to clear all elevators for general building egress.',
                textAr: 'سحب ذراع إنذار الحريق اليدوي لإيقاف المصاعد الكهربائية وإخلائها لعامة المبنى.',
                isCorrect: false,
                score: 15,
                feedbackEn: 'Pulling the fire alarm grounds elevators, preventing paramedics from rolling stretchers to the 3rd floor.',
                feedbackAr: 'تشغيل إنذار الحريق يعطل المصاعد ويجبر المسعفين على حمل النقالة الثقيلة على السلالم.'
              },
              {
                id: 'ev_med1_b',
                textEn: 'Escort all 38 department colleagues down the exit stairs to wait in the ground lobby.',
                textAr: 'مرافقة جميع موظفي القسم الـ 38 عبر السلالم للانتظار في بهو الدور الأرضي.',
                isCorrect: false,
                score: 25,
                feedbackEn: 'Evacuating the entire floor down crowded stairwells during a medical call causes unnecessary disruption.',
                feedbackAr: 'إخلاء القسم كاملاً على السلالم أثناء حادث طبي فردي يسبب إرباكاً وتدافعاً لا مبرر له.'
              },
              {
                id: 'ev_med1_c',
                textEn: 'Send a designated guide to the ground entrance to hold the elevator and lead paramedics up.',
                textAr: 'النزول للبوابة الرئيسية لاستقبال المسعفين وحجز المصعد وإرشادهم مباشرة لموقع المصاب.',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Correct! Designating a guide prevents medics from getting lost in large office complexes.',
                feedbackAr: 'صحيح ومثالي! وجود مرشد عند المدخل يوفر دقائق ثمينة تضيع في البحث عن المكاتب.'
              },
              {
                id: 'ev_med1_d',
                textEn: 'Instruct the reception desk to lock turnstiles until medical paperwork is completed.',
                textAr: 'توجيه موظف الاستقبال بإغلاق بوابات الدخول حتى اكتمال النماذج الطبية للمصاب.',
                isCorrect: false,
                score: 10,
                dangerFlag: true,
                feedbackEn: 'Locking security gates delays arriving emergency life-support crews.',
                feedbackAr: 'إغلاق البوابات يعطل وصول فرق الإنعاش الطبي ويهدد حياة المريض.'
              }
            ]
          },
          communications: {
            roleId: 'communications',
            questionEn: 'How must Communications report this medical crisis to the Airport Emergency Clinic following LNNH?',
            questionAr: 'كيف يبلغ مسؤول الاتصالات عيادة طوارئ المطار عن هذه الحالة الطبية وفق معيار LNNH؟',
            contextEn: 'You are on the line with the KSIA Airport Medical Dispatch desk.',
            contextAr: 'أنت الآن على الهاتف مع مكتب استقبال بلاغات الإسعاف الطبي بمطار الملك سلمان الدولي.',
            options: [
              {
                id: 'cm_med1_a',
                textEn: 'Report: Admin Center Bay 3 (L), Unconscious Worker CPR in Progress (N), 1 Casualty (N), Dense Office Cubicle Clutter (H).',
                textAr: 'إرسال: مبنى الإدارة صالة 3 (الموقع)، موظف فاقد للوعي والإنعاش جارٍ (النوع)، مصاب واحد (العدد)، ممرات مكتبية مزدحمة (الخطر).',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Correct! Accurate LNNH format informs medics to bring cardiac defibrillators and stretcher ramps.',
                feedbackAr: 'صحيح ومثالي! صيغة LNNH الكاملة تنبه المسعفين لتجهيز أجهزة الإنعاش ومعدات النقل المناسبة.'
              },
              {
                id: 'cm_med1_b',
                textEn: 'Report: Admin Building (L), A colleague collapsed (N), please send an ambulance quickly.',
                textAr: 'إرسال: مبنى الإدارة (الموقع)، سقط أحد الزملاء (النوع)، يرجى إرسال سيارة إسعاف بسرعة.',
                isCorrect: false,
                score: 30,
                feedbackEn: 'Incomplete LNNH: Omits specific floor bay, casualty headcount, and corridor access hazards.',
                feedbackAr: 'تقرير LNNH ناقص: أهمل تحديد الصالة والدور الدقيق وعدد المصابين وعوائق الممرات.'
              },
              {
                id: 'cm_med1_c',
                textEn: 'Report: Bay 3 (L), Medical emergency in progress (N), CPR being attempted, send clinic team.',
                textAr: 'إرسال: صالة 3 (الموقع)، حالة طوارئ طبية (النوع)، يجري الإنعاش، أرسلوا فريق العيادة.',
                isCorrect: false,
                score: 30,
                feedbackEn: 'Incomplete LNNH: Missing building identity and specific hazard assessment.',
                feedbackAr: 'غير مكتمل وفق LNNH: يفتقر لاسم المبنى وتحديد المخاطر الميدانية.'
              },
              {
                id: 'cm_med1_d',
                textEn: 'Report: Airport Offices (L), Someone is unresponsive (N), 1 patient (N), we need oxygen right now.',
                textAr: 'إرسال: مكاتب المطار (الموقع)، شخص فاقد للوعي (النوع)، مصاب واحد (العدد)، نحتاج أكسجين حالاً.',
                isCorrect: false,
                score: 25,
                feedbackEn: 'Too generic on location and fails to specify floor access hazards.',
                feedbackAr: 'موقع عام جداً لا يوضح المبنى ولا الدور ولا طبيعة عوائق الدخول.'
              }
            ]
          }
        }
      },
      {
        id: 'med_s2',
        stageNumber: 2,
        stageTitleEn: 'Stage 2: Continuous Compressions & Rescuer Partner Swap Protocol',
        stageTitleAr: 'المرحلة 2: تبديل المسعفين في الضغطات الصدرية وصدمة جهاز AED',
        situationEn: 'The rescuer has been delivering high-quality chest compressions for nearly two minutes and is fatiguing. The corridor AED arrives and attaches pads. A trained partner steps forward to maintain compression quality.',
        situationAr: 'يقوم المسعف بالضغطات الصدرية منذ قرابة دقيقتين وبدأ يرهق، ووصل جهاز الصدمات (AED) وتقدم زميل مدرب للمشاركة والحفاظ على جودة الضغطات.',
        decisions: {
          casualtyCare: {
            roleId: 'casualtyCare',
            questionEn: 'How must the rescuers execute the partner swap to ensure continuous high-quality compressions?',
            questionAr: 'كيف ينفذ المسعفان بروتوكول تبديل الأدوار في الضغطات الصدرية لضمان استمراريتها بجودة عالية؟',
            contextEn: 'Compressions must not be interrupted for more than 5 to 10 seconds during the rescuer switch.',
            contextAr: 'يجب ألا تتوقف الضغطات الصدرية لأكثر من 5 إلى 10 ثوانٍ كحد أقصى أثناء تبديل المسعفين.',
            options: [
              {
                id: 'cc_med2_a',
                textEn: 'Pause compressions for 30 seconds while both rescuers stand up, stretch their arms, and discuss technique.',
                textAr: 'إيقاف الضغطات لمدة 30 ثانية ليقف المسعفان ويريحا أذرعهما ويتناقشا حول الطريقة المثلى.',
                isCorrect: false,
                score: 20,
                dangerFlag: true,
                feedbackEn: 'Dangerous interruption! Pausing compressions >10 seconds drops blood perfusion to zero.',
                feedbackAr: 'توقف خطير! إيقاف الضغط لأكثر من 10 ثوانٍ يوقف تدفق الدم للدماغ والقلب تماماً.'
              },
              {
                id: 'cc_med2_b',
                textEn: 'Have the second rescuer take over compressions at the patient\'s feet while the first rescuer continues at the chest.',
                textAr: 'قيام المسعف الثاني بالضغط على بطن المصاب وأقدامه بينما يستمر الأول بالضغط على الصدر في نفس الوقت.',
                isCorrect: false,
                score: 15,
                dangerFlag: true,
                feedbackEn: 'Compressions must be centered strictly on the lower half of the breastbone, never at the abdomen.',
                feedbackAr: 'الضغط القلبي يتم حصراً على منتصف عظمة القص في الصدر، ويحظر الضغط على البطن أو الأطراف.'
              },
              {
                id: 'cc_med2_c',
                textEn: 'Request relief early, countdown aloud "Switching in 5, 4, 3, 2, 1", and complete the partner swap within 5 to 10 seconds maximum.',
                textAr: 'طلب التبديل مبكراً، والعد التنازلي بصوت عالٍ "تبديل في 5، 4، 3، 2، 1"، وإتمام التبديل في أقل من 5 إلى 10 ثوانٍ.',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Spot on! Vocal countdown and rapid swap under 5–10 seconds preserves vital coronary and cerebral perfusion pressure.',
                feedbackAr: 'إجراء احترافي نموذجي! العد التنازلي والتبديل السريع في أقل من 5-10 ثوانٍ يحافظان على تدفق الدم الحيوي للمخ.'
              },
              {
                id: 'cc_med2_d',
                textEn: 'Continue compressions alone past five minutes without swapping regardless of muscular exhaustion.',
                textAr: 'مواصلة الضغط بمفردك لأكثر من خمس دقائق دون أي تبديل بالرغم من الإرهاق العضلي الشديد.',
                isCorrect: false,
                score: 25,
                feedbackEn: 'Rescuer fatigue after 2 minutes degrades compression depth and rate, severely lowering survival odds.',
                feedbackAr: 'إرهاق المسعف بعد دقيقتين يقلل من عمق وسرعة الضغطات الصدرية مما يخفض فرص نجاة المريض.'
              }
            ]
          },
          teamLeader: {
            roleId: 'teamLeader',
            questionEn: 'What is the Team Leader\'s crucial safety action during defibrillator charging?',
            questionAr: 'ما هو الإجراء الأمني الحاسم لقائد الفريق أثناء شحن جهاز الصدمات؟',
            contextEn: 'The AED states "SHOCK ADVISED... CHARGING... STAND CLEAR!". Rescuers and onlookers are close.',
            contextAr: 'أصدر جهاز AED أمراً: "ينصح بصدمة... جاري الشحن... ابتعدوا!". المسعفون والزملاء بالقرب من المصاب.',
            options: [
              {
                id: 'tl_med2_a',
                textEn: 'Visually sweep the patient, wave everyone back, and loudly announce: "ALL CLEAR! DO NOT TOUCH!".',
                textAr: 'مسح محيط المصاب بالعين، وإبعاد الجميع بإشارة اليد، والصراخ بحزم: "ابتعدوا جميعاً! ممنوع اللمس!".',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Correct! Ensuring zero physical contact before shock discharge prevents secondary electrocution.',
                feedbackAr: 'صحيح ومثالي! التأكد من عدم ملامسة أي شخص للمصاب يمنع انتقال الصدمة الكهربائية للآخرين.'
              },
              {
                id: 'tl_med2_b',
                textEn: 'Permit the CPR rescuer to keep pressing the chest during the shock to maintain compression rhythm.',
                textAr: 'السماح لمسعف الإنعاش بمواصلة الضغط على الصدر أثناء تفريغ الصدمة للحفاظ على الإيقاع.',
                isCorrect: false,
                score: 10,
                dangerFlag: true,
                feedbackEn: 'Lethal hazard! Touching the patient during shock discharge shocks the rescuer and risks secondary cardiac arrest.',
                feedbackAr: 'خطر مميت! ملامسة المصاب أثناء تفريغ الصدمة يصعق المسعف وقد يتسبب في توقف قلبه.'
              },
              {
                id: 'tl_med2_c',
                textEn: 'Turn off the office overhead lights so the AED screen appears brighter and easier to read.',
                textAr: 'إطفاء جميع أضواء السقف في المكتب لتبدو شاشة جهاز الصدمات أكثر وضوحاً وسهولة للقراءة.',
                isCorrect: false,
                score: 20,
                feedbackEn: 'Dimming room light creates shadows and hinders visual confirmation that no one is touching the patient.',
                feedbackAr: 'إطفاء الأنوار يعيق الرؤية ويمنع التأكد البصري من ابتعاد الجميع عن المريض.'
              },
              {
                id: 'tl_med2_d',
                textEn: 'Instruct the team to disconnect the AED pads immediately after the shock is delivered.',
                textAr: 'توجيه الفريق بنزع وسائد جهاز الصدمات فوراً بعد تفريغ الصدمة الكهربائية الأولى.',
                isCorrect: false,
                score: 15,
                feedbackEn: 'Pads must remain attached so the AED can continuously re-analyze cardiac rhythm every two minutes.',
                feedbackAr: 'وسائد الجهاز يجب أن تبقى مثبتة ليعيد الجهاز تحليل النبض تلقائياً كل دقيقتين.'
              }
            ]
          },
          fireSuppression: {
            roleId: 'fireSuppression',
            questionEn: 'How should Fire Suppression assist the arriving ambulance paramedic crew?',
            questionAr: 'كيف يساعد مسؤول الإطفاء طاقم الإسعاف فور وصولهم إلى الدور؟',
            contextEn: 'Paramedics exit the elevator with a wheeled stretcher, heavy cardiac monitors, and an oxygen kit.',
            contextAr: 'خرج المسعفون من المصعد ومعهم نقالة متحركة وأجهزة مراقبة قلب ثقيلة وحقيبة أكسجين.',
            options: [
              {
                id: 'fs_med2_a',
                textEn: 'Hold doors open, guide them briskly through the cleared corridor, and brief them on the patient\'s location.',
                textAr: 'تثبيت الأبواب مفتوحة، وإرشادهم سريعاً عبر الممر الممهد، وتوضيح موقع المصاب بدقة.',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Correct! Seamless physical escort ensures zero delay for heavy medical kits.',
                feedbackAr: 'صحيح ومثالي! فتح الأبواب وإرشاد المسعفين يضمن وصول معدات الإنعاش الثقيلة بأسرع وقت.'
              },
              {
                id: 'fs_med2_b',
                textEn: 'Require paramedics to show their certified ID badges and sign the floor guest registry before proceeding.',
                textAr: 'إلزام المسعفين بإبراز بطاقاتهم والتوقيع في سجل زوار الدور قبل السماح لهم بالمرور.',
                isCorrect: false,
                score: 15,
                dangerFlag: true,
                feedbackEn: 'Bureaucratic stops during cardiac arrest violate life-safety emergency protocols.',
                feedbackAr: 'تعطيل طاقم الإسعاف لطلب بطاقات زوار في حالة توقف قلب يعد مخالفة جسيمة لقوانين السلامة.'
              },
              {
                id: 'fs_med2_c',
                textEn: 'Instruct the paramedics to wait at the elevator lobby until office management authorizes entry.',
                textAr: 'توجيه طاقم الإسعاف بالانتظار عند بهو المصاعد حتى تصدر إدارة المكاتب تصريحاً بالدخول.',
                isCorrect: false,
                score: 15,
                feedbackEn: 'Unauthorized obstruction of emergency medical personnel in an active resuscitation event.',
                feedbackAr: 'تعطيل غير مصرح به لفرق الإسعاف الطبي أثناء محاولة إنعاش حياة إنسان.'
              },
              {
                id: 'fs_med2_d',
                textEn: 'Attempt to operate the paramedic\'s professional defibrillator yourself to show your technical skills.',
                textAr: 'محاولة تشغيل جهاز الصدمات المتقدم الخاص بالمسعفين بنفسك لاستعراض مهاراتك الفنية.',
                isCorrect: false,
                score: 10,
                feedbackEn: 'Interfering with certified paramedics disrupts advanced medical care delivery.',
                feedbackAr: 'التدخل في معدات الإسعاف المتخصصة يعطل تقديم الرعاية الطبية المتقدمة للمصاب.'
              }
            ]
          },
          evacuation: {
            roleId: 'evacuation',
            questionEn: 'How should Evacuation manage office floor staff while paramedics work on the casualty?',
            questionAr: 'كيف يدير مسؤول الإخلاء موظفي الدور أثناء قيام المسعفين بمحاولة إنقاذ الزميل؟',
            contextEn: 'Dozens of colleagues are weeping and attempting to take photos of the chest compressions.',
            contextAr: 'عشرات الموظفين يبكون وبعضهم يحاول تصوير محاولات الإنعاش والضغطات بهواتفهم.',
            options: [
              {
                id: 'ev_med2_a',
                textEn: 'Encourage colleagues to record the scene on their phones to provide video evidence for medical debriefs.',
                textAr: 'تشجيع الموظفين على تصوير المشهد بهواتفهم لتقديم أدلة توثيقية للتقييم الطبي لاحقاً.',
                isCorrect: false,
                score: 15,
                feedbackEn: 'Photographing medical casualties breaches patient dignity, confidentiality, and airport regulations.',
                feedbackAr: 'تصوير المصابين ينتهك خصوصيتهم وكرامتهم ويخالف لوائح مطار الملك سلمان وأنظمة العمل.'
              },
              {
                id: 'ev_med2_b',
                textEn: 'Protect casualty privacy, prohibit phone photography firmly, and guide staff to the quiet lounge.',
                textAr: 'حفظ خصوصية المصاب، ومنع التصوير بالهواتف بحزم، وتوجيه الموظفين لاستراحة هادئة.',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Correct! Enforcing dignity, privacy, and removing emotional staff protects the casualty and team.',
                feedbackAr: 'صحيح ومثالي! حفظ كرامة المريض ومنع التصوير وتوجيه الموظفين للاستراحة يحفظ النظام.'
              },
              {
                id: 'ev_med2_c',
                textEn: 'Order all office colleagues to remain standing in a tight circle around the paramedics to watch.',
                textAr: 'إلزام جميع الزملاء بالوقوف في حلقة ضيقة حول طاقم الإسعاف لمشاهدة ما يفعلونه.',
                isCorrect: false,
                score: 20,
                feedbackEn: 'Crowding paramedics restricts workspace and increases panic among watching coworkers.',
                feedbackAr: 'التجمهر حول طاقم الإسعاف يعيق عملهم ويزيد من حدة التوتر والهلع بين الموظفين.'
              },
              {
                id: 'ev_med2_d',
                textEn: 'Direct staff to move furniture out of the building to the street to clear space.',
                textAr: 'توجيه الموظفين بنقل المكاتب والكراسي لخارج المبنى في الشارع لتوفير مساحة إضافية.',
                isCorrect: false,
                score: 10,
                feedbackEn: 'Pointless distraction that creates corridor blockages and trip hazards.',
                feedbackAr: 'تصرف عبثي يشتت الموظفين ويغلق الممرات بالأثاث المكتبي المنقول.'
              }
            ]
          },
          communications: {
            roleId: 'communications',
            questionEn: 'How should Communications deliver the medical handover report to AOCC following LNNH?',
            questionAr: 'كيف يسلم مسؤول الاتصالات تقرير التسليم الطبي لعمليات المطار وفق معيار LNNH؟',
            contextEn: 'The paramedics are preparing the patient for transport to the airport trauma clinic.',
            contextAr: 'يستعد طاقم الإسعاف لنقل المريض إلى عيادة الحالات الطارئة بالمطار.',
            options: [
              {
                id: 'cm_med2_a',
                textEn: 'Report: Finance Wing Bay 3 (L), Sudden Arrest 1 Shock Delivered (N), 1 Patient in Transit (N), Elevator Route Clear (H).',
                textAr: 'إرسال: صالة المالية 3 (الموقع)، توقف قلب وتفريغ صدمة واحدة (النوع)، مريض واحد منقول (العدد)، مسار المصعد مؤمن (الخطر).',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Correct! Structured LNNH closure keeps airport command informed of hospital transit and cleared access.',
                feedbackAr: 'صحيح ومثالي! تقرير LNNH الختامي يحيط إدارة المطار بحالة نقل المريض وتأمين المسارات.'
              },
              {
                id: 'cm_med2_b',
                textEn: 'Report: Finance Wing (L), Patient being transferred by medics (N), ambulance rolling outside, all good.',
                textAr: 'إرسال: جناح المالية (الموقع)، نقل المريض بواسطة المسعفين (النوع)، سيارة الإسعاف تتحرك، كل شيء تمام.',
                isCorrect: false,
                score: 30,
                feedbackEn: 'Incomplete LNNH: Lacks specific bay location, resuscitation shock metrics, and elevator clearance status.',
                feedbackAr: 'تقرير LNNH ناقص: يفتقر لرقم الصالة المحدد وتفاصيل الصدمات المنفذة وحالة تأمين المسارات.'
              },
              {
                id: 'cm_med2_c',
                textEn: 'Report: Ground ambulance bay (L), cardiac event occurred (N), 1 patient (N), call finished.',
                textAr: 'إرسال: موقع الإسعاف الأرضي (الموقع)، أزمة قلبية حدثت (النوع)، مصاب واحد (العدد)، انتهى البلاغ.',
                isCorrect: false,
                score: 25,
                feedbackEn: 'Fails LNNH: Inaccurate incident origin location and omits hazard mitigation details.',
                feedbackAr: 'مخالف لمعيار LNNH: موقع البلاغ غير دقيق ولا يوضح حالة المسار والمخاطر المتبقية.'
              },
              {
                id: 'cm_med2_d',
                textEn: 'Report: Airport Clinic (L), Patient arrived safely (N), emergency closed, no further data.',
                textAr: 'إرسال: عيادة المطار (الموقع)، المريض وصل بأمان (النوع)، إغلاق الطوارئ، لا توجد بيانات إضافية.',
                isCorrect: false,
                score: 20,
                feedbackEn: 'Misrepresents scene location and lacks operational details of the incident site.',
                feedbackAr: 'يخلط بين موقع الحادث الفعلي والمستشفى، ويفتقر للتفاصيل الميدانية الأساسية.'
              }
            ]
          }
        }
      }
    ]
  },

  // =========================================================================
  // SCENARIO 3: LEVEL 3 (INTERMEDIATE) - IT BATTERY ROOM SMOKE & MISSING STAFF
  // =========================================================================
  {
    id: 'server_smoke',
    level: 3,
    difficulty: 'Intermediate',
    difficultyAr: 'المستوى 3: متقدم',
    titleEn: 'IT Server Closet Smoke & Jammed Security Exit',
    titleAr: 'دخان في غرفة خوادم تقنية المعلومات وعطل بمخرج الطوارئ',
    locationEn: 'Corporate Tower - 3rd Floor IT Systems & Archive Corridor',
    locationAr: 'برج الإدارة - ممر أنظمة تقنية المعلومات والأرشيف بالدور الثالث',
    occupants: 45,
    descriptionEn: 'An uninterruptible power supply (UPS) battery bank overheated in the IT server closet, releasing acrid chemical smoke. The magnetic card reader on Stairwell Exit A failed and the door will not open.',
    descriptionAr: 'ارتفعت حرارة بطاريات (UPS) في غرفة الخوادم فانبعث دخان كيميائي لاذع، وتزامن ذلك مع تعطل القفل المغناطيسي لباب مخرج الطوارئ (أ) وعدم فتحه بالبطاقات.',
    hazardsEn: ['Acrid electrical battery fumes', 'Jammed magnetic access door', 'Smoke spreading down corridor'],
    hazardsAr: ['أبخرة كيميائية وبطاريات لاذعة', 'تعطل القفل المغناطيسي لباب المخرج', 'انتشار الدخان في الممر'],
    casualtiesEn: '1 IT Technician with smoke inhalation coughing near server door',
    casualtiesAr: 'فني تقنية معلومات يعاني من استنشاق أبخرة كيميائية وسعال',
    visualType: 'server_smoke',
    stages: [
      {
        id: 'srv_s1',
        stageNumber: 1,
        stageTitleEn: 'Stage 1: Battery Room Size-Up & Exit Bottleneck',
        stageTitleAr: 'المرحلة 1: معاينة غرفة البطاريات وعائق باب المخرج',
        situationEn: 'Pungent chemical smoke seeps through the server door seams. Around 40 employees are clustering in confusion at the jammed Stairwell A door.',
        situationAr: 'دخان كيميائي خانق يتسرب من حواف باب الخوادم، ويتجمع حوالي 40 موظفاً في ارتباك أمام باب الدرج (أ) المغلق.',
        decisions: {
          fireSuppression: {
            roleId: 'fireSuppression',
            questionEn: 'How should Fire Suppression evaluate fighting this heavy battery smoke fire?',
            questionAr: 'كيف يقيم مسؤول الإطفاء قرار مكافحة هذا الدخان الكثيف المنبعث من غرفة البطاريات؟',
            contextEn: 'The server room door is hot to touch, heavy acid fumes leak from seams, and flames exceed wastebin size.',
            contextAr: 'سطح باب غرفة الخوادم ساخن جداً، وأبخرة حمضية تتسرب من الحواف، واللهب يتجاوز حجم سلة المهملات.',
            options: [
              {
                id: 'fs_srv1_a',
                textEn: 'Open the door slightly to spray clean agent extinguisher into the battery racks before deciding whether to retreat.',
                textAr: 'فتح الباب قليلاً لرش مطفأة الغاز النظيف داخل كابينة البطاريات قبل اتخاذ قرار التراجع.',
                isCorrect: false,
                score: 20,
                dangerFlag: true,
                feedbackEn: 'Violates threshold rules! Opening hot doors to battery fires exposes the rescuer to toxic gas flashover.',
                feedbackAr: 'مخالفة لمعايير الأمان! فتح باب ساخن لحريق بطاريات يعرض المنقذ لوميض ناري وغازات سامة مميتة.'
              },
              {
                id: 'fs_srv1_b',
                textEn: 'Recognize fire exceeds incipient threshold (hot door, dense fumes); keep door closed, trip external power breaker, and evacuate.',
                textAr: 'إدراك أن الحريق يتجاوز عتبة الأمان (الباب ساخن وأبخرة كثيفة)؛ إبقاء الباب مغلقاً وفصل القاطع الخارجي والإخلاء فوراً.',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Correct! The incipient threshold rule mandates immediate escalation when fires exceed safe containment.',
                feedbackAr: 'صحيح ومثالي! تجاوز معايير الأمان الأولية يوجب التراجع الفوري وفصل الكهرباء وترك المكافحة للدفاع المدني.'
              },
              {
                id: 'fs_srv1_c',
                textEn: 'Equip an office dust mask and enter the server room alone to disconnect individual lithium batteries by hand.',
                textAr: 'ارتداء كمامة ورقية ودخول الغرفة بمفردك لمحاولة فصل أسلاك بطاريات الليثيوم يدوياً.',
                isCorrect: false,
                score: 15,
                dangerFlag: true,
                feedbackEn: 'Dust masks provide zero protection against toxic battery gases (cyanide and carbon monoxide).',
                feedbackAr: 'الكمامات الورقية لا تحمي إطلاقاً من غازات السيانيد وأول أكسيد الكربون المنبعثة من البطاريات.'
              },
              {
                id: 'fs_srv1_d',
                textEn: 'Wait outside the server door with an extinguisher for 15 minutes to see if the automatic sprinklers activate.',
                textAr: 'الانتظار خارج باب الغرفة ومعه مطفأة لمدة 15 دقيقة لمعرفة ما إذا كانت الرشاشات التلقائية ستعمل.',
                isCorrect: false,
                score: 20,
                feedbackEn: 'Passive waiting outside an escalating fire allows smoke to contaminate the entire floorplate.',
                feedbackAr: 'الانتظار السلبي دون عزل أو إخلاء يسمح للدخان السام باجتياح مكاتب الدور بأكمله.'
              }
            ]
          },
          teamLeader: {
            roleId: 'teamLeader',
            questionEn: 'How should the Team Leader resolve the bottleneck at the locked Stairwell A door?',
            questionAr: 'كيف يحل قائد الفريق مشكلة تكدس الموظفين أمام باب الدرج (أ) المعطل؟',
            contextEn: 'Smoke is rolling along the ceiling while staff are swiping their badges frantically without success.',
            contextAr: 'الدخان يتدفق على امتداد السقف والموظفون يمررون بطاقاتهم بذعر دون استجابة.',
            options: [
              {
                id: 'tl_srv1_a',
                textEn: 'Tell all 40 employees to stand still at the jammed door and wait for IT staff to reboot the server.',
                textAr: 'الطلب من جميع الموظفين الـ 40 البقاء متجمعين أمام الباب بانتظار إعادة تشغيل الخادم.',
                isCorrect: false,
                score: 25,
                dangerFlag: true,
                feedbackEn: 'Trapping occupants at a dead end while battery smoke rolls overhead risks mass inhalation.',
                feedbackAr: 'إبقاء الموظفين في ممر مسدود تحت سحب الدخان الكيميائي يعرضهم للاختناق الجماعي.'
              },
              {
                id: 'tl_srv1_b',
                textEn: 'Direct staff immediately to reroute to South Stairwell B and order Evacuation to activate the emergency door release.',
                textAr: 'توجيه الموظفين فوراً نحو المخرج البديل (الدرج ب) وتكليف مسؤول الإخلاء بالضغط على زر الطوارئ الأخضر.',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Correct! Redirecting flow to secondary exits while triggering manual overrides clears bottlenecks safely.',
                feedbackAr: 'صحيح ومثالي! التحويل السريع للمخرج البديل مع تفعيل زر التحرير اليدوي يفك التكدس فوراً.'
              },
              {
                id: 'tl_srv1_c',
                textEn: 'Instruct the employees to form two lines and test their individual employee cards one by one on the jammed reader.',
                textAr: 'توجيه الموظفين بالاصطفاف في طابورين وتجربة بطاقاتهم واحداً تلو الآخر على القارئ المعطل.',
                isCorrect: false,
                score: 15,
                feedbackEn: 'Card-testing delays escape while dense smoke is actively filling the corridor.',
                feedbackAr: 'تجربة البطاقات الفردية تضيع وقتاً ثميناً وتزيد من احتمالية الاختناق بالدخان.'
              },
              {
                id: 'tl_srv1_d',
                textEn: 'Advise employees to return to their desks and continue working until physical door keys arrive.',
                textAr: 'نصح الموظفين بالعودة لمكاتبهم ومتابعة العمل حتى وصول المفاتيح اليدوية مع الأمن.',
                isCorrect: false,
                score: 15,
                dangerFlag: true,
                feedbackEn: 'Returning occupants to cubicles during an uncontained electrical fire is a gross safety failure.',
                feedbackAr: 'إعادة الموظفين لمكاتبهم أثناء حريق كهربائي نشط يعد خطأ جسيماً يهدد حياتهم.'
              }
            ]
          },
          evacuation: {
            roleId: 'evacuation',
            questionEn: 'How should Evacuation release the jammed magnetic lock on the Stairwell A door?',
            questionAr: 'كيف يفك مسؤول الإخلاء القفل المغناطيسي المعطل لباب الدرج (أ)؟',
            contextEn: 'You notice the green emergency door release box mounted beside the door frame.',
            contextAr: 'لاحظت وجود صندوق الطوارئ الأخضر (مفتاح التحرير اليدوي / كاسر الزجاج) بجانب إطار الباب.',
            options: [
              {
                id: 'ev_srv1_a',
                textEn: 'Depress the green emergency manual break-glass switch to cut power to the magnetic lock.',
                textAr: 'الضغط على زر كاسر الزجاج الأخضر المخصص للطوارئ لقطع التيار عن المغناطيس وفتح الباب.',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Correct! Green emergency release units mechanically interrupt electromagnet power.',
                feedbackAr: 'صحيح ومثالي! زر الطوارئ الأخضر يقطع الدائرة الكهربائية للمغناطيس ويفتح الباب فوراً.'
              },
              {
                id: 'ev_srv1_b',
                textEn: 'Search through employee drawers for an allen wrench to dismantle the electromagnetic mounting bracket.',
                textAr: 'البحث في أدراج المكاتب عن مفتاح ألن سداسي لتفكيك براغي تثبيت المغناطيس من الجدار.',
                isCorrect: false,
                score: 15,
                feedbackEn: 'Dismantling heavy commercial brackets takes too long while toxic smoke spreads.',
                feedbackAr: 'تفكيك براغي القفل يدوياً يستغرق وقتاً طويلاً وسط تصاعد الدخان الكيميائي الخانق.'
              },
              {
                id: 'ev_srv1_c',
                textEn: 'Wait for building facility engineers to log in remotely from off-site to toggle the door security setting.',
                textAr: 'الانتظار حتى يقوم مهندسو الصيانة بالدخول عن بعد عبر الإنترنت لتعديل إعدادات القفل.',
                isCorrect: false,
                score: 20,
                feedbackEn: 'Remote network logins are slow and often fail during building electrical incidents.',
                feedbackAr: 'الدخول عن بعد بطيء جداً وغالباً ما يتعطل أثناء حوادث الكهرباء في المبنى.'
              },
              {
                id: 'ev_srv1_d',
                textEn: 'Instruct three coworkers to throw their full body weight repeatedly against the magnetic glass door.',
                textAr: 'توجيه ثلاثة موظفين بالارتطام بأجسادهم بقوة وبشكل متكرر ضد الباب الزجاجي المغناطيسي.',
                isCorrect: false,
                score: 15,
                dangerFlag: true,
                feedbackEn: 'Body-slamming glass doors risks catastrophic shattering and severe arterial lacerations.',
                feedbackAr: 'الارتطام بالأبواب الزجاجية قد يؤدي لتحطمها وإصابة الموظفين بجروح قطعية ونزيف حاد.'
              }
            ]
          },
          casualtyCare: {
            roleId: 'casualtyCare',
            questionEn: 'How should Casualty Care treat the technician coughing from chemical battery fumes?',
            questionAr: 'كيف يسعف مسؤول الإسعافات الفني الذي استنشق أبخرة البطاريات الكيميائية؟',
            contextEn: 'The technician escaped the closet coughing violently with chemical throat burning.',
            contextAr: 'خرج الفني من الغرفة وهو يسعل بشدة ويعاني من حرقة شديدة في الحلق والعينين.',
            options: [
              {
                id: 'cc_srv1_a',
                textEn: 'Instruct the technician to sit on the floor inside the server vestibule and breathe through a damp dry-wipe cloth.',
                textAr: 'توجيه الفني بالجلوس داخل مدخل غرفة الخوادم والتنفس عبر قطعة قماش مبللة لمسح الشاشات.',
                isCorrect: false,
                score: 25,
                feedbackEn: 'Cloth filters do not stop toxic battery gases; the casualty must be evacuated to clean fresh air immediately.',
                feedbackAr: 'الأقمشة المبللة لا توقف الغازات السامة؛ يجب نقل المصاب فوراً إلى الهواء النقي خارج المبنى.'
              },
              {
                id: 'cc_srv1_b',
                textEn: 'Move the technician to clean air, flush eyes with water if irritated, and monitor their breathing.',
                textAr: 'نقل الفني إلى هواء نقي، وغسل عينيه بالماء عند تهيجهما، ومراقبة سهولة تنفسه باستمرار.',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Correct! Fresh air and copious eye irrigation reduce chemical burn damage.',
                feedbackAr: 'صحيح ومثالي! الهواء النقي وغسل العينين يقللان من آثار المواد الكيميائية الحارقة.'
              },
              {
                id: 'cc_srv1_c',
                textEn: 'Encourage the technician to take rapid deep breaths of hallway air to expand their lung capacity.',
                textAr: 'تشجيع الفني على أخذ أنفاس عميقة وسريعة من هواء الممر لتوسيع سعة الرئتين.',
                isCorrect: false,
                score: 15,
                dangerFlag: true,
                feedbackEn: 'Deep breathing in a smoke-contaminated corridor draws more toxic acid fumes into deep alveolar tissue.',
                feedbackAr: 'التنفس العميق في ممر ملوث يدخل كميات أكبر من الغازات الحمضية السامة لأعماق الرئة.'
              },
              {
                id: 'cc_srv1_d',
                textEn: 'Provide an antihistamine allergy tablet and tell the worker to walk down the exit alone.',
                textAr: 'إعطاء الفني قرص حساسية ومطالبته بالنزول بمفرده عبر مخرج الطوارئ.',
                isCorrect: false,
                score: 20,
                feedbackEn: 'Oral tablets do not treat acute chemical airway burns and injured staff must not be left unescorted.',
                feedbackAr: 'أقراص الحساسية لا تعالج الحروق الكيميائية ويحظر ترك المصابين ينزلون بمفردهم.'
              }
            ]
          },
          communications: {
            roleId: 'communications',
            questionEn: 'How must Communications report this electrical smoke incident using LNNH?',
            questionAr: 'كيف يبلغ مسؤول الاتصالات عن حادث دخان البطاريات هذا وفق معيار LNNH؟',
            contextEn: 'Civil Defense emergency dispatch answers your priority line call.',
            contextAr: 'رد مأمور عمليات الدفاع المدني على اتصالك عبر الخط الساخن المخصص.',
            options: [
              {
                id: 'cm_srv1_a',
                textEn: 'Transmit: Corporate Tower Floor 3 (L), IT Battery Smoke (N), 45 Occupants Rerouting (N), Jammed Exit Overridden (H).',
                textAr: 'إرسال: برج الإدارة دور 3 (الموقع)، دخان بطاريات خوادم (النوع)، 45 موظفاً يعاد توجيههم (العدد)، عطل باب مخرج يجري تجاوزه (الخطر).',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Spot on! Detailed LNNH report enables dispatch to mobilize chemical smoke extraction fans.',
                feedbackAr: 'دقة عالية! تقرير LNNH المكتمل يمكن العمليات من توجيه فرق إطفاء مجهزة بمراوح شفط الدخان.'
              },
              {
                id: 'cm_srv1_b',
                textEn: 'Transmit: Corporate Tower Floor 3 (L), Smoke alert (N), Evacuation underway, need immediate response.',
                textAr: 'إرسال: برج الإدارة دور 3 (الموقع)، إنذار دخان (النوع)، الإخلاء جاري، نحتاج استجابة فورية.',
                isCorrect: false,
                score: 30,
                feedbackEn: 'Incomplete LNNH: Omits numerical headcount of staff at risk and specific electrical hazard details.',
                feedbackAr: 'غير مكتمل وفق LNNH: أهمل ذكر الأعداد الفعلية المعرضة للخطر وتفاصيل الحريق الكهربائي.'
              },
              {
                id: 'cm_srv1_c',
                textEn: 'Transmit: Corporate Tower IT department (L), Battery incident (N), 45 staff (N), everything under control.',
                textAr: 'إرسال: برج الإدارة قسم تقنية المعلومات (الموقع)، حادث بطاريات (النوع)، 45 موظفاً (العدد)، الأمور تحت السيطرة.',
                isCorrect: false,
                score: 25,
                feedbackEn: 'Misrepresents scene safety by claiming "everything under control" while an exit door is compromised.',
                feedbackAr: 'يضلل فرق الإطفاء بادعاء أن الأمور تحت السيطرة بينما مخرج الطوارئ معطل والدخان ينتشر.'
              },
              {
                id: 'cm_srv1_d',
                textEn: 'Transmit: Floor 3 server room (L), Fire burning (N), Send heavy trucks to airport west gate.',
                textAr: 'إرسال: غرفة سيرفرات دور 3 (الموقع)، حريق يشتعل (النوع)، أرسلوا سيارات الإطفاء للبوابة الغربية.',
                isCorrect: false,
                score: 25,
                feedbackEn: 'Fails LNNH: Omits building name, occupant counts, and jammed security door hazard.',
                feedbackAr: 'مخالف لمعيار LNNH: يفتقر لاسم البرج وأعداد الموظفين وعائق الباب المغلق.'
              }
            ]
          }
        }
      },
      {
        id: 'srv_s2',
        stageNumber: 2,
        stageTitleEn: 'Stage 2: Assembly Roll Call & Missing Person Discovery',
        stageTitleAr: 'المرحلة 2: حصر نقطة التجمع واكتشاف فقدان موظفين',
        situationEn: 'The team successfully guides occupants down Stairwell B to the Ground Assembly Point. However, during the structured muster roll call, 2 IT clerks are unaccounted for and suspected to still be on the 3rd floor.',
        situationAr: 'وصل الموظفون لنقطة التجمع عبر الدرج (ب)، ولكن أثناء مطابقة كشوف الأسماء تبين فقدان موظفين اثنين من قسم التقنية يشتبه بوجودهما بالدور الثالث.',
        decisions: {
          evacuation: {
            roleId: 'evacuation',
            questionEn: 'How should Evacuation handle the discovery that 2 employees are missing from the roll call?',
            questionAr: 'كيف يتعامل مسؤول الإخلاء مع اكتشاف عدم وجود موظفين اثنين في كشف حصر الأسماء؟',
            contextEn: 'Colleagues confirm two junior IT clerks were working in the rear tape archive when the alarm sounded.',
            contextAr: 'أكد الزملاء أن موظفين اثنين كانا يعملان في غرفة الأرشيف الخلفية عند انطلاق صفارة الإنذار.',
            options: [
              {
                id: 'ev_srv2_a',
                textEn: 'Send two swift volunteer colleagues back up the stairs into the burning building to search for them.',
                textAr: 'إرسال موظفين متطوعين للركض مجدداً عبر السلالم داخل المبنى المحترق للبحث عنهما.',
                isCorrect: false,
                score: 15,
                dangerFlag: true,
                feedbackEn: 'Sending civilians back into burning structures creates additional trapped casualties.',
                feedbackAr: 'إرسال موظفين مدنيين لداخل مبنى محترق يعرض حياتهم للهلاك ويضاعف أعداد الضحايا.'
              },
              {
                id: 'ev_srv2_b',
                textEn: 'Mark the muster sheet as complete and assume the two missing clerks probably left early for lunch.',
                textAr: 'اعتماد كشف التجمع كمكتمل وافتراض أن الموظفين المفقودين ربما غادرا لتناول الغداء مبكراً.',
                isCorrect: false,
                score: 10,
                dangerFlag: true,
                feedbackEn: 'Dangerous assumption! Unaccounted occupants must be treated as trapped until confirmed safe.',
                feedbackAr: 'افتراض خطير وإهمال جسيم! أي مفقود في كشف الحصر يعامل كمحاصر حتى يثبت العكس.'
              },
              {
                id: 'ev_srv2_c',
                textEn: 'Immediately verify identities, note their last known location (3rd floor rear archive), and inform the Team Leader and Communications.',
                textAr: 'التحقق الفوري من هويتهما، وتحديد موقعهما المرجح (أرشيف الدور 3)، وإبلاغ قائد الفريق ومسؤول الاتصالات.',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Correct! Rapid verification and communicating precise last known coordinates directs firefighter search operations.',
                feedbackAr: 'صحيح ومثالي! التحقق وتحديد آخر موقع معروف يوجه فرق إنقاذ الدفاع المدني مباشرة للغرفة.'
              },
              {
                id: 'ev_srv2_d',
                textEn: 'Instruct all 43 assembled employees to shout the missing clerks\' names together across the parking lot.',
                textAr: 'الطلب من جميع الموظفين الـ 43 في المواقف الصراخ بأسماء المفقودين معاً بصوت موحد.',
                isCorrect: false,
                score: 15,
                feedbackEn: 'Shouting in parking lots does not penetrate commercial multi-story fire-rated buildings.',
                feedbackAr: 'الصراخ في المواقف الخارجية لا يصل للغرف المعزولة داخل المباني الخرسانية المقاومة للحريق.'
              }
            ]
          },
          communications: {
            roleId: 'communications',
            questionEn: 'How must Communications report the missing personnel situation to Civil Defense using LNNH?',
            questionAr: 'كيف يبلغ مسؤول الاتصالات الدفاع المدني عن حالة المفقودين وفق معيار LNNH؟',
            contextEn: 'Civil Defense Incident Commander arrives at the Ground Assembly Post clipboard in hand.',
            contextAr: 'وصل قائد فرقة الدفاع المدني ومعه لوحة العمليات التكتيكية لنقطة التجمع الخارجية.',
            options: [
              {
                id: 'cm_srv2_a',
                textEn: 'Report: Corporate Tower Floor 3 Rear Tape Archive (L), Active Battery Fire (N), 43 Accounted but 2 Missing Staff Trapped (N), Stair A Blocked (H).',
                textAr: 'إرسال: برج الإدارة دور 3 أرشيف الأشرطة (الموقع)، حريق بطاريات نشط (النوع)، 43 سالمون وفقدان موظفين اثنين محاصرين (العدد)، الدرج أ معطل (الخطر).',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Spot on! Detailed LNNH gives arriving firefighters exact target coordinates (rear archive) and known hazard constraints.',
                feedbackAr: 'دقة واحترافية متناهية! تقرير LNNH المكتمل يحدد لرجال الإطفاء موقع المحاصرين بدقة وحالة المخاطر.'
              },
              {
                id: 'cm_srv2_b',
                textEn: 'Report: Corporate Tower (L), Fire still burning (N), We have most people outside (N), please check the floors.',
                textAr: 'إرسال: برج الإدارة (الموقع)، الحريق لا يزال مشتعلاً (النوع)، معظم الناس في الخارج (العدد)، تفقدوا الأدوار.',
                isCorrect: false,
                score: 25,
                feedbackEn: 'Vague numbers and locations force firefighters into time-consuming full-building searches.',
                feedbackAr: 'البيانات الغامضة تجبر رجال الإطفاء على تفتيش كامل المبنى مما يضيع وقتاً حاسماً لإنقاذ المحاصرين.'
              },
              {
                id: 'cm_srv2_c',
                textEn: 'Report: Floor 3 (L), Two people are somewhere in the building (N), 43 outside (N), no idea where they are.',
                textAr: 'إرسال: الدور 3 (الموقع)، شخصان في مكان ما بالمبنى (النوع)، 43 بالخارج (العدد)، لا نعلم أين هما.',
                isCorrect: false,
                score: 30,
                feedbackEn: 'Lacks the critical last-known location (rear archive) and omits stairwell hazard intelligence.',
                feedbackAr: 'أهمل تحديد آخر موقع معروف (أرشيف الأشرطة) وتفاصيل تعطل مسار الدرج (أ).'
              },
              {
                id: 'cm_srv2_d',
                textEn: 'Report: Assembly area (L), Roll call finished (N), 43 staff (N), everything resolved.',
                textAr: 'إرسال: منطقة التجمع (الموقع)، انتهاء حصر الأسماء (النوع)، 43 موظفاً (العدد)، تم حل كل شيء.',
                isCorrect: false,
                score: 10,
                dangerFlag: true,
                feedbackEn: 'Disastrous falsehood! Claiming everything resolved when 2 people are missing endangers trapped lives.',
                feedbackAr: 'تضليل كارثي! ادعاء انتهاء الحادث بينما هناك موظفان محاصران يعرض حياتهما للهلاك.'
              }
            ]
          },
          teamLeader: {
            roleId: 'teamLeader',
            questionEn: 'How should the Team Leader coordinate with Civil Defense regarding the two missing clerks?',
            questionAr: 'كيف ينسق قائد الفريق مع قائد الدفاع المدني لإنقاذ الموظفين المفقودين؟',
            contextEn: 'The Civil Defense Captain prepares to deploy a search-and-rescue team with thermal imaging cameras.',
            contextAr: 'يستعد قائد الدفاع المدني لإدخال فريق بحث وإنقاذ مجهز بكاميرات تصوير حراري وأجهزة تنفس.',
            options: [
              {
                id: 'tl_srv2_a',
                textEn: 'Order an ERT volunteer to guide the firefighters up the stairs into the burning sector.',
                textAr: 'أمر أحد متطوعي فريق طوارئ المكاتب بمرافقة رجال الإطفاء لداخل الدور المحترق كدليل.',
                isCorrect: false,
                score: 15,
                dangerFlag: true,
                feedbackEn: 'Civilian ERT members must never enter burning structural envelopes with firefighters.',
                feedbackAr: 'يُحظر تماماً على موظفي المكاتب مرافقة فرق الاقتحام لداخل المناطق المشتعلة.'
              },
              {
                id: 'tl_srv2_b',
                textEn: 'Provide the architectural floor plan, point out the rear tape archive, confirm power isolation, and maintain exterior command.',
                textAr: 'تقديم المخطط المعماري للدور، وتحديد موقع الأرشيف بدقة، وتأكيد فصل الكهرباء، وإدارة التنسيق خارجياً.',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Correct! Supplying building schematics and exact room coordinates maximizes firefighter rescue speed.',
                feedbackAr: 'صحيح ومثالي! تزويد الإطفاء بالمخطط المعماري وموقع الغرفة بدقة يسرع الوصول للمحاصرين وإنقاذهما.'
              },
              {
                id: 'tl_srv2_c',
                textEn: 'Advise Civil Defense to delay entry until the fire naturally extinguishes itself.',
                textAr: 'نصح الدفاع المدني بتأجيل الدخول حتى ينطفئ الحريق تلقائياً من تلقاء نفسه.',
                isCorrect: false,
                score: 10,
                feedbackEn: 'Delaying rescue when occupants are trapped in toxic smoke zones leads to fatal asphyxiation.',
                feedbackAr: 'تأخير الإنقاذ أثناء وجود محاصرين في بيئة غازات سامة يؤدي إلى وفاتهم اختناقاً.'
              },
              {
                id: 'tl_srv2_d',
                textEn: 'Tell the assembled employees to vote on whether the missing clerks are worth rescuing.',
                textAr: 'الطلب من الموظفين التصويت على ما إذا كان المفقودان يستحقان المخاطرة بإنقاذهما.',
                isCorrect: false,
                score: 0,
                feedbackEn: 'Inhumane and absurd. Rescue is mandatory for all occupants.',
                feedbackAr: 'تصرف غير إنساني ومرفوض تماماً؛ إنقاذ المحاصرين واجب قطعي لا يقبل النقاش.'
              }
            ]
          },
          casualtyCare: {
            roleId: 'casualtyCare',
            questionEn: 'How should Casualty Care prepare for the extracted missing clerks at the triage post?',
            questionAr: 'كيف يجهز مسؤول الإسعافات الرعاية للموظفين المحاصرين فور إخراجهما بنقطة الفرز؟',
            contextEn: 'Firefighters confirm they located the two clerks conscious in the archive and are escorting them down.',
            contextAr: 'أكد رجال الإطفاء العثور على الموظفين بوعيهما في الأرشيف ويجري إنزالهما للخارج.',
            options: [
              {
                id: 'cc_srv2_a',
                textEn: 'Prepare fresh air space, ready oxygen therapy, monitor for toxic inhalation signs, and prep ATMIST handovers.',
                textAr: 'تجهيز منطقة بهواء نقي، وإعداد أسطوانات الأكسجين، ومراقبة علامات التسمم، وتجهيز تقرير ATMIST.',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Correct! Immediate oxygen therapy and structured ATMIST handover ensures clinical continuity for smoke victims.',
                feedbackAr: 'صحيح ومثالي! إعداد الأكسجين الطبي وتجهيز تقرير ATMIST يضمنان استمرار الرعاية للمتأثرين بالدخان.'
              },
              {
                id: 'cc_srv2_b',
                textEn: 'Have them drink heavy milk shakes immediately to coat their stomach lining against chemical fumes.',
                textAr: 'إعطاؤهما حليباً ثقيلاً ليشرباه فوراً لحماية بطانة المعدة من الأبخرة الكيميائية.',
                isCorrect: false,
                score: 15,
                feedbackEn: 'Drinking milk does not decontaminate lungs and triggers acute vomiting in smoke casualties.',
                feedbackAr: 'شرب الحليب خرافة شائعة لا تعالج الرئتين وتسبب القيء والشرقة للمصابين بالدخان.'
              },
              {
                id: 'cc_srv2_c',
                textEn: 'Discharge them immediately to drive home if they can walk across the parking lot unassisted.',
                textAr: 'السماح لهما بالانصراف وقيادة سيارتيهما للمنزل فوراً طالما أنهما قادران على المشي.',
                isCorrect: false,
                score: 20,
                dangerFlag: true,
                feedbackEn: 'Toxic smoke inhalation complications (pulmonary edema) can appear hours later; paramedic check is mandatory.',
                feedbackAr: 'مضاعفات استنشاق الدخان السام قد تظهر بعد ساعات؛ الفحص الطبي المتخصص إلزامي قبل الانصراف.'
              },
              {
                id: 'cc_srv2_d',
                textEn: 'Force both clerks to run laps around the parking lot to clear their respiratory tract.',
                textAr: 'إجبار الموظفين على الجري في مواقف السيارات لتنظيف مجرى التنفس بالحركة.',
                isCorrect: false,
                score: 10,
                dangerFlag: true,
                feedbackEn: 'Physical exertion worsens respiratory distress in acute chemical inhalation patients.',
                feedbackAr: 'المجهود البدني يفاقم ضيق التنفس ويزيد من خطر هبوط الأكسجين الحاد في الدم.'
              }
            ]
          },
          fireSuppression: {
            roleId: 'fireSuppression',
            questionEn: 'What structural briefing must Fire Suppression give to the Civil Defense entry team?',
            questionAr: 'ما هي المعلومات الإنشائية التي يجب على مسؤول الإطفاء تقديمها لفرقة اقتحام الدفاع المدني؟',
            contextEn: 'Civil Defense entry team is connecting their attack hose lines at the building riser.',
            contextAr: 'تقوم فرقة اقتحام الدفاع المدني بتوصيل خراطيم المكافحة بمحبس الإطفاء الرأسي للمبنى.',
            options: [
              {
                id: 'fs_srv2_a',
                textEn: 'Brief: Level 3 IT server door closed, floor sub-panel tripped, Stair B clear, and rear archive occupied.',
                textAr: 'توضيح: باب سيرفرات دور 3 مغلق، القاطع الكهربائي مفصول، الدرج ب مفتوح، والأرشيف الخلفي به محاصرون.',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Correct! Accurate utility and access briefings save crucial minutes during structural fire attacks.',
                feedbackAr: 'صحيح ومثالي! توضيح حالة القواطع الكهربائية والأبواب ومسار الدرج يسرع الاقتحام وينقذ المحاصرين.'
              },
              {
                id: 'fs_srv2_b',
                textEn: 'Advise firefighters to use only water hoses directly onto the energized 480V server racks.',
                textAr: 'نصح رجال الإطفاء بصب الماء مباشرة على كبائن السيرفرات المتصلة بكهرباء 480 فولت.',
                isCorrect: false,
                score: 10,
                dangerFlag: true,
                feedbackEn: 'Discharging water onto live high-voltage infrastructure risks fatal electrical arc blasts.',
                feedbackAr: 'رش الماء على دوائر كهربائية حية يسبب انفجار القوس الكهربائي وصعق رجال الإطفاء.'
              },
              {
                id: 'fs_srv2_c',
                textEn: 'Tell the firefighters that you already fully extinguished the fire using two office fire blankets.',
                textAr: 'إخبار رجال الإطفاء بأنك قمت بإخماد الحريق بالكامل بنفسك باستخدام بطانيتي حريق مكتبية.',
                isCorrect: false,
                score: 15,
                dangerFlag: true,
                feedbackEn: 'False briefings conceal active thermal runaway inside battery rooms, endangering responders.',
                feedbackAr: 'التقارير المضللة تخفي استمرار اشتعال البطاريات وتعرض فرق الإطفاء للمفاجآت الخطرة.'
              },
              {
                id: 'fs_srv2_d',
                textEn: 'Ask the entry team to delay entry while you retrieve personal souvenirs from your desk.',
                textAr: 'الطلب من فرقة الاقتحام تأجيل الدخول ريثما تصعد أنت لجلب أغراضك التذكارية من مكتبك.',
                isCorrect: false,
                score: 10,
                feedbackEn: 'Selfish delays risk the lives of trapped occupants still inside the structure.',
                feedbackAr: 'تعطيل الاقتحام لجمع مقتنيات شخصية يعرض حياة الموظفين المحاصرين بالداخل للموت.'
              }
            ]
          }
        }
      }
    ]
  },

  // =========================================================================
  // SCENARIO 4: LEVEL 4 (ADVANCED) - HAZARDOUS CHEMICAL SOLVENT SPILL
  // =========================================================================
  {
    id: 'chemical_spill',
    level: 4,
    difficulty: 'Advanced',
    difficultyAr: 'المستوى 4: متقدم جداً',
    titleEn: 'Printing Depot Solvent Spill & Electrical Arc Risk',
    titleAr: 'انسكاب مذيبات كيميائية ومخاطر شرارة كهربائية بقسم الطباعة',
    locationEn: 'Engineering Directorate - Ground Floor Plotting & Archive Depot',
    locationAr: 'إدارة الشؤون الهندسية - قسم طباعة المخططات والأرشيف بالدور الأرضي',
    occupants: 30,
    descriptionEn: 'A 20-liter canister of flammable cleaning solvent toppled near an electric drying press in the architectural plotting room. Combustible vapors are spreading rapidly across the floor toward a live floor socket.',
    descriptionAr: 'انقلبت حاوية مذيب كيميائي سريع الاشتعال سعة 20 لتراً قرب مكبس تجفيف كهربائي في غرفة المخططات، والأبخرة القابلة للاشتعال تزحف نحو مقبس كهربائي أرضي.',
    hazardsEn: ['Flammable chemical vapor cloud', 'Live floor socket ignition source', 'Solvent migration into ventilation return'],
    hazardsAr: ['سحابة أبخرة كيميائية سريعة الاشتعال', 'مقبس كهربائي أرضي قد يحدث شرارة', 'تسرب الأبخرة لفتحات التكييف'],
    casualtiesEn: '1 Printing Operator with solvent splash on hands & dizziness',
    casualtiesAr: 'فني طباعة تعرض لرذاذ المذيب على يديه مع دوار خفيف',
    visualType: 'chemical_spill',
    stages: [
      {
        id: 'chem_s1',
        stageNumber: 1,
        stageTitleEn: 'Stage 1: Spill Isolation & Vapor Ignition Prevention',
        stageTitleAr: 'المرحلة 1: عزل الانسكاب ومنع مصادر الاشتعال',
        situationEn: 'A pool of pungent chemical solvent is creeping toward a power strip on the floor. The printing operator is washing their hands in panic.',
        situationAr: 'بركة المذيب الكيميائي تزحف نحو توصيلة كهربائية أرضية، وفني الطباعة يغسل يديه بذعر.',
        decisions: {
          fireSuppression: {
            roleId: 'fireSuppression',
            questionEn: 'How should Fire Suppression evaluate containment vs evacuation threshold for this chemical spill?',
            questionAr: 'كيف يوازن مسؤول الإطفاء بين احتواء الانسكاب وإعلان الإخلاء الفوري وفق معايير الأمان؟',
            contextEn: 'A yellow wall-mounted chemical spill kit with absorbent booms is nearby, but vapors are spreading rapidly.',
            contextAr: 'توجد حقيبة طوارئ كيميائية صفراء بحواجز امتصاص بالجدار، ولكن الأبخرة القابلة للاشتعال تتصاعد بكثافة.',
            options: [
              {
                id: 'fs_chem1_a',
                textEn: 'Use high-pressure water streams to dilute and wash the solvent down the corridor floor drain.',
                textAr: 'استخدام خراطيم مياه عالية الضغط لتخفيف المذيب وغسله نحو فتحات تصريف الممر.',
                isCorrect: false,
                score: 20,
                dangerFlag: true,
                feedbackEn: 'Washing flammable solvents with water spreads the combustible vapor cloud and pollutes drainage systems.',
                feedbackAr: 'غسل المذيبات السريعة الاشتعال بالماء ينشر الأبخرة في كامل المبنى ويلوث شبكة الصرف.'
              },
              {
                id: 'fs_chem1_b',
                textEn: 'Assess if vapor cloud is safe to contain (<60s, unblocked exit); deploy absorbent boom perimeter from upwind while isolating sockets.',
                textAr: 'تقييم أمان التدخل (<60 ثانية ومسار هروب مفتوح)؛ نشر حواجز الامتصاص من جهة مهب الريح مع عزل المقابس فوراً.',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Correct! Containing from upwind while preserving an unblocked retreat path prevents flammable liquid from touching arc sources.',
                feedbackAr: 'صحيح ومثالي! التطويق من جهة مهب الريح مع تأمين مسار الخروج يمنع وصول السائل للمقابس الكهربائية.'
              },
              {
                id: 'fs_chem1_c',
                textEn: 'Discharge an ABC dry chemical extinguisher onto the unignited liquid pool to neutralize the odor.',
                textAr: 'تفريغ مطفأة بودرة جافة فوق بركة السائل قبل اشتعالها لإخفاء الرائحة الكيميائية.',
                isCorrect: false,
                score: 25,
                feedbackEn: 'Dry chemical extinguishers do not neutralize flammable liquids and blow chemical vapors further into the air.',
                feedbackAr: 'بودرة الإطفاء لا تبطل مفعول السوائل وتطايرها ينشر الأبخرة الكيميائية في أجواء الغرفة.'
              },
              {
                id: 'fs_chem1_d',
                textEn: 'Attempt to ignite the spill deliberately with a match to burn it off before it touches the electric socket.',
                textAr: 'إشعال السائل عمداً بعود ثقاب لحرقه سريعاً قبل أن يصل للمقبس الكهربائي الأرضي.',
                isCorrect: false,
                score: 0,
                dangerFlag: true,
                feedbackEn: 'Lethal error! Deliberately lighting volatile chemical pools causes explosive vapor flashover.',
                feedbackAr: 'خطأ كارثي ومميت! إشعال السوائل المتطايرة عمداً يحدث انفجاراً هائلاً يدمر المنشأة.'
              }
            ]
          },
          teamLeader: {
            roleId: 'teamLeader',
            questionEn: 'What is the Team Leader\'s primary tactical command regarding this flammable vapor spill?',
            questionAr: 'ما هو القرار التكتيكي الأول لقائد الفريق تجاه هذا الانسكاب الكيميائي القابل للاشتعال؟',
            contextEn: 'Strong chemical smells are rising, and an electrical spark could ignite a flash fire.',
            contextAr: 'رائحة كيميائية قوية تتصاعد، وأي شرارة كهربائية قد تتسبب في وميض ناري فوري.',
            options: [
              {
                id: 'tl_chem1_a',
                textEn: 'Order immediate evacuation of the plotting room, isolate power from outside, and forbid light switching.',
                textAr: 'إصدار أمر إخلاء فوري لغرفة الطباعة، وفصل الكهرباء من قاطع خارجي، ومنع لمس مفاتيح الإضاءة.',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Correct! Switching lights or equipment on/off creates sparks that ignite flammable vapor clouds.',
                feedbackAr: 'صحيح ومثالي! لمس مفاتيح الكهرباء يولد شرارات قد تشعل الأبخرة الكيميائية فوراً.'
              },
              {
                id: 'tl_chem1_b',
                textEn: 'Instruct staff to remain in the plotting room and use desktop fans to blow vapors toward the hallway.',
                textAr: 'الطلب من الموظفين البقاء بالغرفة واستخدام مراوح مكتبية لتوجيه الأبخرة نحو الممر الخارجي.',
                isCorrect: false,
                score: 15,
                dangerFlag: true,
                feedbackEn: 'Standard electric fan motors create internal sparks that ignite solvent vapor mixtures.',
                feedbackAr: 'محركات المراوح المكتبية تولد شرارات داخلية تشعل الأبخرة الكيميائية المتطايرة فوراً.'
              },
              {
                id: 'tl_chem1_c',
                textEn: 'Permit employees to continue plotting if they promise to keep windows open during work hours.',
                textAr: 'السماح للموظفين بمواصلة الطباعة بشرط فتح النوافذ أثناء ساعات العمل المتبقية.',
                isCorrect: false,
                score: 20,
                feedbackEn: 'Working inside explosive vapor atmospheres violates mandatory GACA industrial safety mandates.',
                feedbackAr: 'مواصلة العمل وسط أجواء غازات سريعة الاشتعال مخالفة صريحة لمعايير السلامة المهنية.'
              },
              {
                id: 'tl_chem1_d',
                textEn: 'Order staff to cover the chemical pool with dry blueprint sheets to soak up the solvent.',
                textAr: 'أمر الموظفين بتغطية بركة المذيب بأوراق المخططات الجافة لامتصاص السائل بالورق.',
                isCorrect: false,
                score: 20,
                feedbackEn: 'Paper sheets become highly flammable wicks that accelerate flash fires if an arc occurs.',
                feedbackAr: 'تغطية السائل بأوراق عادية يجعلها فتائل سريعة الاشتعال تضاعف من سرعة انتشار النيران.'
              }
            ]
          },
          casualtyCare: {
            roleId: 'casualtyCare',
            questionEn: 'How should Casualty Care decontaminate the operator with solvent on their hands and skin?',
            questionAr: 'كيف يطهر مسؤول الإسعافات فني الطباعة الذي تعرض لرذاذ المذيب على يديه؟',
            contextEn: 'The operator has solvent on both forearms and complains of skin burning and stinging eyes.',
            contextAr: 'المذيب الكيميائي يغطي ساعدي الفني وهو يشتكي من حرقة في الجلد وحرقان بالعينين.',
            options: [
              {
                id: 'cc_chem1_a',
                textEn: 'Wipe the solvent vigorously with dry paper towels without applying water to avoid spreading the chemical.',
                textAr: 'مسح المذيب بقوة باستخدام مناديل ورقية جافة دون استخدام أي ماء لتجنب نشر المادة.',
                isCorrect: false,
                score: 20,
                feedbackEn: 'Dry wiping drives corrosive solvents deeper into dermal pores; copious water flushing is strictly required.',
                feedbackAr: 'المسح الجاف يدخل المذيبات الكيميائية في مسام الجلد؛ الغسيل المستمر بالماء هو الحل المعتمد.'
              },
              {
                id: 'cc_chem1_b',
                textEn: 'Flush the skin and eyes with clean running water for at least 15 minutes and remove contaminated clothes.',
                textAr: 'غسل الجلد والعينين بماء نظيف جارٍ لمدة 15 دقيقة على الأقل ونزع الملابس الملوثة بالمذيب.',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Correct! Continuous 15-minute water irrigation is the international medical standard for chemical splashes.',
                feedbackAr: 'صحيح ومثالي! غسل الجلد والعينين بالماء الجاري لمدة 15 دقيقة هو المعيار الطبي المعتمد.'
              },
              {
                id: 'cc_chem1_c',
                textEn: 'Apply heavy motor oil over the burned skin to neutralize the chemical solvent reaction.',
                textAr: 'دهن الجلد المصاب بزيت سيارات ثقيل لمعادلة التفاعل الكيميائي للمذيب الصناعي.',
                isCorrect: false,
                score: 10,
                dangerFlag: true,
                feedbackEn: 'Applying petroleum oils locks in chemicals and accelerates severe tissue ulceration.',
                feedbackAr: 'وضع الزيوت والمواد البترولية يحبس المواد الكيميائية داخل الجلد ويزيد من تآكل الأنسجة.'
              },
              {
                id: 'cc_chem1_d',
                textEn: 'Instruct the operator to wait until the end of the shift to shower at home.',
                textAr: 'توجيه الفني بالانتظار حتى انتهاء ساعات الدوام للاستحمام في منزله.',
                isCorrect: false,
                score: 10,
                feedbackEn: 'Delaying chemical decontamination causes permanent chemical burns and systemic toxicity.',
                feedbackAr: 'تأخير غسل الكيماويات يسبب حروقاً عميقة دائمة وتسمماً عبر امتصاص الجلد للمذيب.'
              }
            ]
          },
          evacuation: {
            roleId: 'evacuation',
            questionEn: 'How should Evacuation clear the adjacent blueprint archives and offices?',
            questionAr: 'كيف يخلي مسؤول الإخلاء أرشيف المخططات والمكاتب المجاورة لموقع الانسكاب؟',
            contextEn: 'Chemical fumes are migrating through open office doorways into the administration hallway.',
            contextAr: 'الأبخرة الكيميائية تتسرب عبر الأبواب المفتوحة وتتجه نحو ممر المكاتب الإدارية.',
            options: [
              {
                id: 'ev_chem1_a',
                textEn: 'Guide occupants downwind through the main plotting hall so everyone remains in one visible group.',
                textAr: 'توجيه الموظفين مع اتجاه هبوب الريح عبر صالة الطباعة الرئيسية لضمان بقائهم في مجموعة واحدة.',
                isCorrect: false,
                score: 15,
                dangerFlag: true,
                feedbackEn: 'Evacuating downwind forces staff directly through the toxic chemical vapor path.',
                feedbackAr: 'الإخلاء مع اتجاه الريح يجبر الموظفين على استنشاق سحابة الأبخرة الكيميائية السامة.'
              },
              {
                id: 'ev_chem1_b',
                textEn: 'Direct occupants upwind toward the exterior courtyard exit and close connecting doors behind them.',
                textAr: 'توجيه الموظفين بعكس اتجاه الريح نحو مخرج الفناء الخارجي وإغلاق الأبواب خلفهم لمنع الأبخرة.',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Correct! Upwind evacuation prevents toxic vapor inhalation and closing doors protects adjacent wings.',
                feedbackAr: 'صحيح ومثالي! الإخلاء بعكس اتجاه الأبخرة وإغلاق الأبواب يحمي الموظفين من استنشاق السموم.'
              },
              {
                id: 'ev_chem1_c',
                textEn: 'Advise employees to gather in the basement storage cellar until the smell dissipates.',
                textAr: 'توجيه الموظفين بالتجمع في مستودع القبو الأرضي حتى تزول الرائحة الكيميائية.',
                isCorrect: false,
                score: 15,
                dangerFlag: true,
                feedbackEn: 'Heavy solvent vapors are heavier than air and sink into basements, creating asphyxiation traps.',
                feedbackAr: 'أبخرة المذيبات أثقل من الهواء وتهبط نحو الأقبية مما يحبس الموظفين في بيئة خانقة مميتة.'
              },
              {
                id: 'ev_chem1_d',
                textEn: 'Instruct occupants to hold paper folders over their mouths and remain seated at their desks.',
                textAr: 'الطلب من الموظفين وضع ملفات ورقية على أفواههم والبقاء جالسين في مكاتبهم.',
                isCorrect: false,
                score: 20,
                feedbackEn: 'Paper folders offer zero vapor filtration; immediate upwind evacuation is strictly required.',
                feedbackAr: 'الملفات الورقية لا تحمي من الأبخرة الكيميائية إطلاقاً؛ الإخلاء الفوري هو الحل الوحيد.'
              }
            ]
          },
          communications: {
            roleId: 'communications',
            questionEn: 'How must Communications report this hazardous chemical spill using LNNH format?',
            questionAr: 'كيف يبلغ مسؤول الاتصالات عن هذا الانسكاب الكيميائي وفق معيار LNNH؟',
            contextEn: 'You contact the KSIA Emergency Dispatch HazMat response desk.',
            contextAr: 'أنت تتصل بمكتب طوارئ المواد الخطرة (HazMat) بعمليات مطار الملك سلمان.',
            options: [
              {
                id: 'cm_chem1_a',
                textEn: 'Report: Engineering Building (L), Chemical leak (N), sending staff out, need cleanup crew.',
                textAr: 'إرسال: مبنى الهندسة (الموقع)، تسرب كيميائي (النوع)، إخراج الموظفين، نطلب فرقة تنظيف.',
                isCorrect: false,
                score: 25,
                feedbackEn: 'Incomplete LNNH: Lacks room location, specific volume/flammability details, and electrical ignition hazards.',
                feedbackAr: 'تقرير LNNH ناقص: يفتقر لرقم الغرفة وكمية المذيب وطبيعة خطر الاشتعال الكهربائي.'
              },
              {
                id: 'cm_chem1_b',
                textEn: 'Report: Ground Floor (L), 20 liters of cleaning liquid spilled (N), 30 employees (N), please assist.',
                textAr: 'إرسال: الدور الأرضي (الموقع)، انسكاب 20 لتر سائل تنظيف (النوع)، 30 موظفاً (العدد)، نطلب المساعدة.',
                isCorrect: false,
                score: 30,
                feedbackEn: 'Fails to specify the exact building identity and omits critical electrical arc hazard details.',
                feedbackAr: 'أهمل ذكر اسم المبنى بدقة وتجاهل خطر الشرارة الكهربائية القابلة لإشعال الغازات.'
              },
              {
                id: 'cm_chem1_c',
                textEn: 'Report: Engineering Directorate Ground Plotting Room (L), 20L Flammable Solvent Spill (N), 30 Evacuating 1 Skin Splash (N), Electrical Arc Ignition Risk (H).',
                textAr: 'إرسال: مبنى الشؤون الهندسية غرفة المخططات (الموقع)، انسكاب 20 لتر مذيب سريع الاشتعال (النوع)، 30 يخلون وإصابة جلدية (العدد)، خطر اشتعال كهربائي (الخطر).',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Correct! Accurate LNNH format alerts HazMat teams to bring foam extinguishers and vapor meters.',
                feedbackAr: 'صحيح ومثالي! صيغة LNNH المتكاملة تتيح لفرق المواد الخطرة إحضار رغوة الإطفاء وأجهزة قياس الغازات.'
              },
              {
                id: 'cm_chem1_d',
                textEn: 'Report: Plotting room (L), Flammable spill under control (N), 1 injured (N), send general ambulance.',
                textAr: 'إرسال: غرفة المخططات (الموقع)، انسكاب قابل للاشتعال تحت السيطرة (النوع)، مصاب واحد (العدد)، أرسلوا إسعافاً.',
                isCorrect: false,
                score: 25,
                feedbackEn: 'Incomplete building coordinates and falsely claims situation is under control while vapor is active.',
                feedbackAr: 'موقع المبنى غير واضح وادعاء غير صحيح بأن الحادث تحت السيطرة مع استمرار تصاعد الأبخرة.'
              }
            ]
          }
        }
      },
      {
        id: 'chem_s2',
        stageNumber: 2,
        stageTitleEn: 'Stage 2: Ventilation Control & Sensory Processing Support',
        stageTitleAr: 'المرحلة 2: إيقاف التكييف ومساندة الزملاء ذوي الحساسية الحسية',
        situationEn: 'The HVAC air intake threatens to suck chemical solvent vapors into the Level 1 executive suites. Meanwhile, an architectural drafter with sensory processing sensitivity has become overwhelmed by the flashing alarms and chemical stench, freezing by the doorway.',
        situationAr: 'فتحات التكييف تسحب الأبخرة الكيميائية نحو مكاتب الدور الأول، بينما أصيب رسام هندسي ذو حساسية حسية بفرط تحسس وتجمد عند مدخل الباب بسبب وميض الإنذار ورائحة الكيماويات.',
        decisions: {
          evacuation: {
            roleId: 'evacuation',
            questionEn: 'How should Evacuation support the colleague with sensory sensitivity frozen by the chemical alarm?',
            questionAr: 'كيف يساند مسؤول الإخلاء الرسام الهندسي ذا الحساسية الحسية المتجمد عند الباب؟',
            contextEn: 'The colleague is covering their eyes and nose, trembling and unresponsive to standard loud commands.',
            contextAr: 'الموظف يغطي عينيه وأنفه ويرتجف ولا يستجيب لأوامر الإخلاء الصوتية العادية.',
            options: [
              {
                id: 'ev_chem2_a',
                textEn: 'Approach calmly, offer sensory earplugs/clean mask, communicate in short low-tone phrases, and escort them through the quiet courtyard exit.',
                textAr: 'الاقتراب بهدوء، وتقديم سدادات أذن وكمامة نظيفة، والتحدث بعبارات قصيرة هادئة، ومرافقته عبر مخرج الفناء الهادئ.',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Correct! Reducing sensory overload (noise, odor) and using low calm tones enables safe unforced evacuation.',
                feedbackAr: 'صحيح ومثالي! تقليل المثيرات الحسية (الضجيج والرائحة) والتحدث بنبرة هادئة يتيحان إخلاءه بأمان.'
              },
              {
                id: 'ev_chem2_b',
                textEn: 'Grab the colleague by the belt and drag them forcibly across the plotting room floor.',
                textAr: 'الإمساك بالموظف من حزامه وسحبه بالقوة فوق أرضية غرفة الطباعة.',
                isCorrect: false,
                score: 15,
                dangerFlag: true,
                feedbackEn: 'Dragging overstimulated individuals induces acute panic resistance and risks dragging them into the chemical pool.',
                feedbackAr: 'السحب العنيف يثير نوبة ذعر حادة وقد يتسبب في سقوط الموظف داخل بركة المواد الكيميائية.'
              },
              {
                id: 'ev_chem2_c',
                textEn: 'Tell the colleague that there is no chemical smell and they are imagining the alarms.',
                textAr: 'إخبار الموظف بأنه لا توجد أي رائحة كيميائية وأنه يتخيل أصوات الإنذار فقط.',
                isCorrect: false,
                score: 10,
                feedbackEn: 'Invalidating genuine sensory distress deepens disorientation and psychological trauma.',
                feedbackAr: 'إنكار الخطر يربك الموظف ويفاقم صدمته النفسية ويمنعه من استعادة توازنه الحركي.'
              },
              {
                id: 'ev_chem2_d',
                textEn: 'Leave the colleague at the doorway while directing other employees to push past them.',
                textAr: 'ترك الموظف عند مدخل الباب وتوجيه باقي الموظفين بالتدافع وتجاوزه في الممر.',
                isCorrect: false,
                score: 15,
                dangerFlag: true,
                feedbackEn: 'Crowd pushing past a frozen individual causes crushing falls and blocks egress flow.',
                feedbackAr: 'تدافع الموظفين حول شخص متجمد يسبب سقوطه وسقوط الآخرين ويعطل انسيابية المخرج.'
              }
            ]
          },
          fireSuppression: {
            roleId: 'fireSuppression',
            questionEn: 'How should Fire Suppression prevent chemical vapors from circulating through the building ventilation system?',
            questionAr: 'كيف يمنع مسؤول الإطفاء انتقال الأبخرة الكيميائية عبر شبكة تكييف المبنى؟',
            contextEn: 'The return air grill on the plotting room wall is actively pulling solvent fumes toward upper office floors.',
            contextAr: 'فتحة سحب الهواء الجدارية في غرفة المخططات تسحب أبخرة المذيب نحو مكاتب الأدوار العليا.',
            options: [
              {
                id: 'fs_chem2_a',
                textEn: 'Turn the air conditioning fans to maximum speed to dilute the vapors with outside air.',
                textAr: 'تشغيل مراوح التكييف على أقصى سرعة لمحاولة تخفيف تركيز الأبخرة بهواء خارجي.',
                isCorrect: false,
                score: 20,
                dangerFlag: true,
                feedbackEn: 'Running fans on maximum distributes explosive toxic vapors directly into upper occupied floors.',
                feedbackAr: 'زيادة سرعة المراوح يضخ الغازات السامة القابلة للاشتعال مباشرة للأدوار العليا المأهولة.'
              },
              {
                id: 'fs_chem2_b',
                textEn: 'Trip the local emergency HVAC ventilation shutdown switch on the corridor wall to close dampers.',
                textAr: 'الضغط على زر الإيقاف الطارئ لنظام التكييف والتهوية (HVAC) بالجدار لإغلاق فتحات السحب فوراً.',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Correct! Emergency HVAC shutdown shuts air dampers and halts toxic gas spread to other floors.',
                feedbackAr: 'صحيح ومثالي! زر الإيقاف الطارئ للتكييف يغلق الدنابر الميكانيكية ويمنع انتقال الغازات للأدوار الأخرى.'
              },
              {
                id: 'fs_chem2_c',
                textEn: 'Tape office paper sheets over the ventilation grill to create an airtight seal.',
                textAr: 'تثبيت أوراق مكتبية عادية بشريط لاصق فوق فتحة التكييف لسد مسار الهواء.',
                isCorrect: false,
                score: 20,
                feedbackEn: 'Paper sheets are pulled into ducts by fan suction and fail to block vapor molecules.',
                feedbackAr: 'أوراق المكاتب تبتلعها فتحات السحب بسهولة ولا يمكنها منع تسرب جزيئات الغازات.'
              },
              {
                id: 'fs_chem2_d',
                textEn: 'Discharge water hoses directly into the return air duct to wash the fumes out.',
                textAr: 'توجيه خراطيم المياه ورشها مباشرة داخل مجاري التكييف لغسل الأبخرة بالماء.',
                isCorrect: false,
                score: 15,
                dangerFlag: true,
                feedbackEn: 'Water in electrical HVAC ducts causes short circuits and electrical conflagration.',
                feedbackAr: 'رش الماء داخل مجاري التكييف يحدث التماساً كهربائياً خطيراً في محركات المراوح.'
              }
            ]
          },
          teamLeader: {
            roleId: 'teamLeader',
            questionEn: 'How should the Team Leader respond to a report that a contractor is missing in the paper vault?',
            questionAr: 'كيف يتعامل قائد الفريق مع بلاغ فقدان عامل نظافة داخل مستودع أوراق المخططات؟',
            contextEn: 'A staff member reports: "The cleaner was inside the paper vault, we should run in to drag them out!".',
            contextAr: 'أحد الموظفين يقول: "عامل النظافة كان داخل مستودع الأوراق، يجب أن نركض للداخل لإخراجه!".',
            options: [
              {
                id: 'tl_chem2_a',
                textEn: 'Forbid civilian re-entry into the chemical vapor zone, post entry sentries, and brief incoming HazMat crews on exact room coordinates.',
                textAr: 'منع الدخول المدني لمنطقة الأبخرة الكيميائية، وتثبيت حراسة على المداخل، وتزويد فرق HazMat بموقع الغرفة الدقيق.',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Correct! Untrained entries into toxic solvent zones cause rescuer collapse; professional HazMat teams must execute searches.',
                feedbackAr: 'صحيح ومثالي! الدخول العشوائي يوقع المنقذين صرعى للغازات؛ فرق المواد الخطرة المجهزة هي المختصة بالإنقاذ.'
              },
              {
                id: 'tl_chem2_b',
                textEn: 'Allow two ERT members to hold wet paper towels over their faces and search the vault for 30 seconds.',
                textAr: 'السماح لعضوين من فريق الطوارئ بوضع مناديل مبللة على وجهيهما والبحث في المستودع لـ 30 ثانية.',
                isCorrect: false,
                score: 15,
                dangerFlag: true,
                feedbackEn: 'Paper towels do not filter toxic solvent vapors; entering personnel will lose consciousness rapidly.',
                feedbackAr: 'المناديل المبللة لا تحمي من الغازات الكيميائية إطلاقاً؛ المتطوعون سيفقدون الوعي بالداخل فوراً.'
              },
              {
                id: 'tl_chem2_c',
                textEn: 'Assume the contractor already exited through an unmonitored side window.',
                textAr: 'افتراض أن عامل النظافة خرج بالفعل بمفرده عبر إحدى النوافذ الجانبية غير المراقبة.',
                isCorrect: false,
                score: 15,
                feedbackEn: 'Unverified assumptions risk leaving trapped casualties inside lethal atmospheres.',
                feedbackAr: 'الافتراضات غير المؤكدة تعرض حياة المحاصرين للاختناق والموت داخل الغرف المغلقة.'
              },
              {
                id: 'tl_chem2_d',
                textEn: 'Direct staff to return inside the plotting depot to conduct an organized line search.',
                textAr: 'توجيه الموظفين بالدخول مجدداً لقسم الطباعة وإجراء بحث جماعي منظم بالداخل.',
                isCorrect: false,
                score: 10,
                dangerFlag: true,
                feedbackEn: 'Ordering civilians into flammable toxic vapor envelopes is a catastrophic command breach.',
                feedbackAr: 'أمر الموظفين بالدخول في بيئة غازات قابلة للاشتعال يعد خطأ قيادياً كارثياً.'
              }
            ]
          },
          casualtyCare: {
            roleId: 'casualtyCare',
            questionEn: 'How should Casualty Care prepare for the extracted cleaner once HazMat brings them out?',
            questionAr: 'كيف يجهز مسؤول الإسعافات الرعاية لعامل النظافة فور إخراجه بواسطة فريق HazMat؟',
            contextEn: 'HazMat firefighters are extracting the cleaner with respiratory protective equipment.',
            contextAr: 'رجال إطفاء HazMat يخرجون عامل النظافة بأجهزة التنفس لنقطة الفرز بالخارج.',
            options: [
              {
                id: 'cc_chem2_a',
                textEn: 'Prepare fresh air space outside, ready emergency oxygen therapy, and check airway, breathing, and pulse.',
                textAr: 'تجهيز مساحة بهواء نقي بالخارج، وإعداد أسطوانة الأكسجين، وفحص مجرى التنفس والنبض فور استلامه.',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Correct! Rapid ABC check and high-flow oxygen reverse acute chemical vapor hypoxia.',
                feedbackAr: 'صحيح ومثالي! فحص العلامات الحيوية (ABC) وتوفير الأكسجين يعالجان نقص الأكسجين الحاد الناتج عن الغازات.'
              },
              {
                id: 'cc_chem2_b',
                textEn: 'Administer oral energy drinks immediately to raise blood sugar levels.',
                textAr: 'إعطاء المصاب مشروبات طاقة عن طريق الفم فوراً لرفع مستوى السكر في الدم.',
                isCorrect: false,
                score: 20,
                feedbackEn: 'Chemical inhalation causes acute nausea; oral drinks induce choking and aspiration.',
                feedbackAr: 'استنشاق الغازات يسبب غثياناً حاداً؛ إعطاء سوائل فموية يسبب القيء وانسداد مجرى الهواء.'
              },
              {
                id: 'cc_chem2_c',
                textEn: 'Instruct the casualty to breathe into a paper bag to treat suspected hyperventilation.',
                textAr: 'توجيه المصاب بالتنفس داخل كيس ورقي لعلاج اشتباه فرط التنفس لديه.',
                isCorrect: false,
                score: 15,
                dangerFlag: true,
                feedbackEn: 'Rebreathing in paper bags during toxic chemical inhalation causes lethal hypoxia.',
                feedbackAr: 'التنفس في أكياس ورقية أثناء التسمم الكيميائي يقلل الأكسجين ويسبب اختناقاً مميتاً.'
              },
              {
                id: 'cc_chem2_d',
                textEn: 'Apply hot towels over the casualty\'s chest to stimulate deeper inhalation.',
                textAr: 'وضع مناشف ساخنة فوق صدر المصاب لتحفيزه على أخذ أنفاس أعمق.',
                isCorrect: false,
                score: 20,
                feedbackEn: 'Ineffective and burns skin; prompt oxygenation and clear airway management are mandatory.',
                feedbackAr: 'تصرف غير علمي يسبب حروقاً؛ التدخل الصحيح هو الأكسجين وتأمين مجرى التنفس.'
              }
            ]
          },
          communications: {
            roleId: 'communications',
            questionEn: 'How must Communications transmit the updated LNNH report to Civil Defense HazMat Command?',
            questionAr: 'كيف يرسل مسؤول الاتصالات تقرير LNNH المحدث لقيادة الدفاع المدني والمواد الخطرة؟',
            contextEn: 'The HazMat Battalion Commander arrives at the incident command post.',
            contextAr: 'وصل قائد وحدة المواد الخطرة بالدفاع المدني لنقطة قيادة الحادث الميدانية.',
            options: [
              {
                id: 'cm_chem2_a',
                textEn: 'Report: Engineering Building (L), Chemical spill contained (N), all 30 staff outside (N), no further support needed.',
                textAr: 'إرسال: مبنى الهندسة (الموقع)، احتواء الانسكاب (النوع)، 30 موظفاً بالخارج (العدد)، لا نحتاج دعماً إضافياً.',
                isCorrect: false,
                score: 25,
                feedbackEn: 'Misleading report: Fails to mention the trapped cleaner in the vault and active vapor migration.',
                feedbackAr: 'تقرير مضلل: أهمل ذكر وجود عامل محاصر بالمستودع واستمرار تصاعد الأبخرة الكيميائية.'
              },
              {
                id: 'cm_chem2_b',
                textEn: 'Report: Ground Plotting Room & Paper Vault (L), Solvent Vapors HVAC Shut (N), 30 Evacuated 1 Extracted (N), Electrical Isolation Confirmed (H).',
                textAr: 'إرسال: غرفة المخططات والمستودع (الموقع)، أبخرة مذيب والتكييف مفصول (النوع)، إخلاء 30 وإنقاذ عامل (العدد)، تأكيد فصل الكهرباء (الخطر).',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Spot on! Complete LNNH update ensures Civil Defense has full accountability and hazard status.',
                feedbackAr: 'دقة واحترافية متناهية! تقرير LNNH يمنح قيادة الحادث صورة واضحة عن الأعداد والمخاطر المعزولة.'
              },
              {
                id: 'cm_chem2_c',
                textEn: 'Report: Plotting room (L), Vapors rising (N), Cleaner being rescued (N), need more fire engines.',
                textAr: 'إرسال: غرفة المخططات (الموقع)، أبخرة تتصاعد (النوع)، جاري إنقاذ العامل (العدد)، أرسلوا سيارات إطفاء إضافية.',
                isCorrect: false,
                score: 30,
                feedbackEn: 'Incomplete LNNH: Missing building identity, exact muster numbers, and HVAC status.',
                feedbackAr: 'غير مكتمل وفق LNNH: يفتقر لاسم المبنى وحصر أعداد الموظفين وحالة إغلاق التكييف.'
              },
              {
                id: 'cm_chem2_d',
                textEn: 'Report: Assembly area (L), HazMat incident (N), 30 occupants present (N), awaiting final instructions.',
                textAr: 'إرسال: منطقة التجمع (الموقع)، حادث مواد خطرة (النوع)، 30 موظفاً متواجدون (العدد)، بانتظار التوجيهات.',
                isCorrect: false,
                score: 25,
                feedbackEn: 'Lacks details of the seat of the spill, the extracted casualty, and electrical isolation facts.',
                feedbackAr: 'يفتقر لتحديد موقع الانسكاب الداخلي وحالة المصاب وتأكيد عزل القواطع الكهربائية.'
              }
            ]
          }
        }
      }
    ]
  },

  // =========================================================================
  // SCENARIO 5: LEVEL 5 (MASTER DRILL) - EXECUTIVE CONFLAGRATION & EVAC-CHAIR
  // =========================================================================
  {
    id: 'executive_cascade',
    level: 5,
    difficulty: 'Master Drill',
    difficultyAr: 'المستوى 5: التحدي الشامل الأكبر',
    titleEn: 'Executive Wing Smoke Influx & Mobility Evacuation',
    titleAr: 'انتشار الدخان في جناح الإدارة العليا ومساعدة ذوي الإعاقة الحركية',
    locationEn: 'KSIA Headquarters - 4th Floor Executive Boardroom & Directorate',
    locationAr: 'المقر الرئيسي لمطار الملك سلمان - الدور الرابع وجناح الإدارة العامة',
    occupants: 55,
    descriptionEn: 'A high-voltage audio-visual control rack suffered an electrical explosion in the Executive Boardroom. Thick black cyanide smoke is rolling through executive corridors. An auditor using a wheelchair is stranded, and primary Stairwell B is showing smoke infiltration.',
    descriptionAr: 'حدث انفجار في كابينة أجهزة العرض بقاعة الاجتماعات الرئيسية، وتصاعد دخان أسود كثيف في ممرات الإدارة العليا. يوجد موظف تدقيق يستخدم كرسياً متحركاً، مع تسرب دخان في مدخل الدرج (ب).',
    hazardsEn: ['Heavy toxic cyanide smoke reducing visibility', 'Wheelchair occupant requiring specialized stair descent', 'Stairwell B pressurized smoke leak'],
    hazardsAr: ['دخان كثيف سام يحجب الرؤية', 'موظف بكرسي متحرك يحتاج كرسي إخلاء الدرج', 'تسرب الدخان في بئر الدرج (ب)'],
    casualtiesEn: '1 Wheelchair User (Uninjured, needs stair descent) & 1 Executive in severe shock',
    casualtiesAr: 'موظف بكرسي متحرك (سليم ويحتاج مساعدة بالدرج) + مسؤول إداري تحت صدمة حادة',
    visualType: 'stairwell_evac',
    stages: [
      {
        id: 'exec_s1',
        stageNumber: 1,
        stageTitleEn: 'Stage 1: Multi-Hazard Escalation & Evac-Chair Deployment',
        stageTitleAr: 'المرحلة 1: تصاعد الأزمة وتجهيز كرسي إخلاء الدرج',
        situationEn: 'Thick black smoke triggers building sirens. The floor auditor in a wheelchair is outside their office, while executives are debating whether to pack confidential paper files.',
        situationAr: 'دخان أسود كثيف أطلق صفارات الإنذار، وموظف التدقيق ذو الكرسي المتحرك ينتظر في الممر، بينما يتجادل مسؤولون حول جمع ملفات ورقية سرية.',
        decisions: {
          fireSuppression: {
            roleId: 'fireSuppression',
            questionEn: 'How should Fire Suppression evaluate fighting this heavy boardroom AV rack fire?',
            questionAr: 'كيف يقيم مسؤول الإطفاء قرار مكافحة هذا الحريق المتصاعد بكابينة أجهزة العرض بقاعة الاجتماعات؟',
            contextEn: 'Flames in the AV rack are 2 meters tall, ceiling tiles are falling, and the room exceeds wastebin threshold.',
            contextAr: 'لهب كابينة الأجهزة يتجاوز مترين وبلاط السقف يتساقط، وحجم الحريق يتجاوز عتبة سلة المهملات بكثير.',
            options: [
              {
                id: 'fs_exec1_a',
                textEn: 'Discharge an office clean agent extinguisher into the 2-meter flames while standing inside the burning room.',
                textAr: 'تفريغ مطفأة غاز نظيف داخل اللهب المتصاعد بارتفاع مترين مع الوقوف داخل القاعة المشتعلة.',
                isCorrect: false,
                score: 15,
                dangerFlag: true,
                feedbackEn: 'Violates incipient fire criteria! A 2-meter high fire cannot be suppressed with a portable extinguisher and risks flashover.',
                feedbackAr: 'مخالفة لقواعد السلامة! حريق بارتفاع مترين لا يمكن إطفاؤه بمطفأة يدوية ويعرض المنقذ للاحتراق.'
              },
              {
                id: 'fs_exec1_b',
                textEn: 'Assess that fire exceeds safe incipient limits (>bin size, structural flame); do not enter, seal fire door, and isolate electrical sub-panel.',
                textAr: 'إدراك أن الحريق يتجاوز حدود الأمان (>حجم سلة مهملات ولهب هيكلي)؛ عدم الدخول، إغلاق باب الحريق، وفصل القاطع الفرعي.',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Correct! The incipient threshold rule strictly forbids attacking fires larger than a wastepaper bin; sealing the door starves flames.',
                feedbackAr: 'صحيح ومثالي! تجاوز الحريق لحدود الأمان يوجب التراجع الفوري، وإغلاق الباب المقاوم للحريق يحرم النار من الأكسجين.'
              },
              {
                id: 'fs_exec1_c',
                textEn: 'Prop the boardroom door open with a chair to let heat vent into executive corridors before firefighting arrives.',
                textAr: 'تثبيت باب قاعة الاجتماعات مفتوحاً بكرسي لتصريف الحرارة نحو ممرات المكاتب قبل وصول الإطفاء.',
                isCorrect: false,
                score: 15,
                dangerFlag: true,
                feedbackEn: 'Propping open fire doors creates a chimney effect that spreads deadly cyanide smoke into escape corridors.',
                feedbackAr: 'إبقاء أبواب الحريق مفتوحة يحدث تيار سحب ينشر دخان السيانيد السام في مسارات الهروب.'
              },
              {
                id: 'fs_exec1_d',
                textEn: 'Throw office water cups at the high-voltage electrical rack to slow down the fire spread.',
                textAr: 'رمي أكواب مياه الشرب المكتبية على كابينة الكهرباء ذات الجهد العالي لإبطاء انتشار اللهب.',
                isCorrect: false,
                score: 10,
                dangerFlag: true,
                feedbackEn: 'Water on live high-voltage electrical equipment causes catastrophic arc blasts and electrocution.',
                feedbackAr: 'إلقاء الماء على أجهزة كهربائية عالية الجهد يسبب انفجار القوس الكهربائي وصعقاً قاتلاً.'
              }
            ]
          },
          teamLeader: {
            roleId: 'teamLeader',
            questionEn: 'How should the Team Leader orchestrate this complex multi-hazard office evacuation?',
            questionAr: 'كيف يقود قائد الفريق هذا الإخلاء المعقد في ظل وجود مخاطر متعددة؟',
            contextEn: 'Smoke is lowering from the ceiling, executives want to save files, and a colleague needs stair assistance.',
            contextAr: 'الدخان ينخفض من السقف، والمسؤولون يريدون حفظ الملفات، وزميل يحتاج مساعدة للنزول على الدرج.',
            options: [
              {
                id: 'tl_exec1_a',
                textEn: 'Instruct the wheelchair auditor to wait alone in the boardroom while executives load confidential files.',
                textAr: 'الطلب من موظف الكرسي المتحرك الانتظار بمفرده بالقاعة ريثما يقوم المسؤولون بتحميل الملفات السرية.',
                isCorrect: false,
                score: 15,
                dangerFlag: true,
                feedbackEn: 'Abandoning mobility-impaired staff to save paper files violates airport life-safety laws.',
                feedbackAr: 'ترك زميل ذي إعاقة لإنقاذ أوراق مكتبية يعد مخالفة جسيمة لقوانين السلامة وحماية الأرواح.'
              },
              {
                id: 'tl_exec1_b',
                textEn: 'Order all paper files abandoned immediately, assign Evacuation to deploy the Evac-Chair, and route staff to clean Stairwell A.',
                textAr: 'إصدار أمر بترك جميع الملفات فوراً، وتكليف فريق الإخلاء بتجهيز كرسي Evac-Chair، وتوجيه الموظفين للدرج النظيف (أ).',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Correct! Masterful command: human life over paper files, priority mobility assist, and choosing uncompromised exits.',
                feedbackAr: 'صحيح ومثالي! قيادة واعية: حماية الأرواح مقدمة على الملفات، وتأمين ذوي الإعاقة، واختيار المخرج الخالي من الدخان.'
              },
              {
                id: 'tl_exec1_c',
                textEn: 'Direct the wheelchair colleague to enter the passenger elevator alone and ride it down.',
                textAr: 'توجيه الموظف ذي الكرسي المتحرك باستخدام مصعد الركاب العادي بمفرده والنزول به.',
                isCorrect: false,
                score: 0,
                dangerFlag: true,
                feedbackEn: 'Elevators fail during fires; elevator shafts act as smoke chimneys, suffocating occupants.',
                feedbackAr: 'خطأ قاتل ومحظور قطعاً! يُمنع استخدام المصاعد في الحرائق لاحتمال انقطاع الكهرباء واختناق من بداخلها.'
              },
              {
                id: 'tl_exec1_d',
                textEn: 'Hold all staff on Level 4 until Civil Defense arrives at the boardroom door.',
                textAr: 'إبقاء جميع الموظفين في الدور الرابع حتى يصل رجال الدفاع المدني لباب قاعة الاجتماعات.',
                isCorrect: false,
                score: 15,
                feedbackEn: 'Unjustified sheltering in place during an uncontained electrical conflagration risks mass asphyxiation.',
                feedbackAr: 'البقاء في مكان الحادث أثناء حريق كهربائي متصاعد يعرض الموظفين للاختناق بالدخان.'
              }
            ]
          },
          evacuation: {
            roleId: 'evacuation',
            questionEn: 'How must the Evacuation lead transfer the colleague in the wheelchair down the stairwell?',
            questionAr: 'كيف ينقل مسؤول الإخلاء الزميل ذو الكرسي المتحرك عبر درج الطوارئ؟',
            contextEn: 'The specialized emergency Evacuation Chair (Evac-Chair) is mounted on the wall near Stairwell A.',
            contextAr: 'كرسي الإخلاء المخصص (Evac-Chair) معلق على الجدار المخصص بجوار مخرج درج الطوارئ (أ).',
            options: [
              {
                id: 'ev_exec1_a',
                textEn: 'Try to carry the 90kg motorized wheelchair down the steep stairs with bare hands.',
                textAr: 'محاولة حمل الكرسي الكهربائي الثقيل وزنه 90 كجم باليدين والنزول به على السلم الحاد.',
                isCorrect: false,
                score: 20,
                dangerFlag: true,
                feedbackEn: 'Heavy motorized chairs slip easily on steps, causing catastrophic injuries to patient and rescuer.',
                feedbackAr: 'الكراسي الكهربائية ثقيلة جداً وتؤدي للانزلاق والكسور البالغة للمريض والمسعف.'
              },
              {
                id: 'ev_exec1_b',
                textEn: 'Unfold the certified Evac-Chair, secure chest and leg safety belts, and glide down the stair treads with a partner.',
                textAr: 'تجهيز كرسي Evac-Chair الجداري، وتثبيت أحزمة الصدر والقدمين، والنزول عبر مسارات التزلج بمساندة زميل.',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Correct! Certified Evac-Chairs use friction skid tracks to glide smoothly down steps without heavy lifting.',
                feedbackAr: 'صحيح ومثالي! كراسي الإخلاء المعتمدة تعتمد على مسارات احتكاك تضمن نزولاً سلساً دون رفع أوزان ثقيلة.'
              },
              {
                id: 'ev_exec1_c',
                textEn: 'Instruct the colleague to slide down the stairs on their stomach while holding the handrail.',
                textAr: 'الطلب من الزميل التزحلق على بطنه عتبة بعد عتبة ممسكاً بالدرابزين.',
                isCorrect: false,
                score: 10,
                dangerFlag: true,
                feedbackEn: 'Degrading and causes severe blunt force trauma to spine and limbs.',
                feedbackAr: 'تصرف مهين ومؤذٍ يسبب كدمات وكسوراً في العمود الفقري والأطراف.'
              },
              {
                id: 'ev_exec1_d',
                textEn: 'Tell the wheelchair colleague to wait in the stairwell landing until all other 54 occupants finish descending.',
                textAr: 'الطلب من موظف الكرسي الانتظار في بسطة الدرج حتى ينتهي الـ 54 موظفاً الآخرون من النزول.',
                isCorrect: false,
                score: 20,
                feedbackEn: 'Leaving mobility casualties on landings creates bottlenecks and delays specialized transport.',
                feedbackAr: 'ترك ذوي الإعاقة على بسطات الدرج يعطل الحركة ويؤخر إخلاءهم الآمن.'
              }
            ]
          },
          casualtyCare: {
            roleId: 'casualtyCare',
            questionEn: 'How should Casualty Care assist the executive who is panicking and hyperventilating in the hallway?',
            questionAr: 'كيف يتعامل مسؤول الإسعافات مع المسؤول الإداري الذي أصيب بنوبة ذعر وتنفس سريع مفرط بالممر؟',
            contextEn: 'An executive is hyperventilating, weeping, clutching their chest, and refusing to move.',
            contextAr: 'أحد المسؤولين يتنفس بسرعة مفرطة ويبكي ممسكاً بصدره ويرفض التحرك بسبب الهلع.',
            options: [
              {
                id: 'cc_exec1_a',
                textEn: 'Shout into their face that panicking will get everyone killed in the fire.',
                textAr: 'الصراخ في وجهه بأن الهلع والارتباك سيتسببان في مقتل الجميع بالحريق.',
                isCorrect: false,
                score: 10,
                dangerFlag: true,
                feedbackEn: 'Aggressive shouting escalates acute panic attacks into complete motor paralysis.',
                feedbackAr: 'الصراخ يفاقم نوبة الهلع ويؤدي إلى شلل حركي وانهيار تام للمصاب.'
              },
              {
                id: 'cc_exec1_b',
                textEn: 'Give the executive an over-the-counter sedative pill from your desk drawer.',
                textAr: 'إعطاء المسؤول قرصاً مهدئاً من درج مكتبك لتهدئة أعصابه.',
                isCorrect: false,
                score: 15,
                dangerFlag: true,
                feedbackEn: 'Administering sedatives during active egress impairs motor balance on stairwells.',
                feedbackAr: 'إعطاء مهدئات أثناء الإخلاء يفقد المصاب توازنه الحركي ويزيد من خطر سقوطه على السلالم.'
              },
              {
                id: 'cc_exec1_c',
                textEn: 'Speak in a calm reassuring tone, guide slow rhythmic deep breathing, link arms, and walk them down safely.',
                textAr: 'التحدث بنبرة هادئة ومطمئنة، وتوجيهه لأخذ أنفاس عميقة وبطيئة، ومسك ذراعه لمساعدته على المشي للخارج.',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Correct! Psychological first aid and physical arm-linking grounds panic and restores purposeful movement.',
                feedbackAr: 'صحيح ومثالي! الإسعاف النفسي والتوجيه الحازم اللطيف يساعد الشخص المذعور على تجاوز الصدمة والمشي.'
              },
              {
                id: 'cc_exec1_d',
                textEn: 'Leave the executive in the boardroom until they calm down naturally on their own.',
                textAr: 'ترك المسؤول داخل قاعة الاجتماعات حتى يهدأ بمفرده بشكل طبيعي.',
                isCorrect: false,
                score: 10,
                dangerFlag: true,
                feedbackEn: 'Abandoning a panicking person inside a smoke-compromised room leads to fatal smoke inhalation.',
                feedbackAr: 'ترك شخص مذعور في غرفة ملوثة بالدخان يؤدي إلى محاصرته ووفاته اختناقاً.'
              }
            ]
          },
          communications: {
            roleId: 'communications',
            questionEn: 'How must Communications report this escalating executive conflagration using the LNNH protocol?',
            questionAr: 'كيف يبلغ مسؤول الاتصالات عن هذا الحريق المتصاعد بجناح الإدارة وفق معيار LNNH؟',
            contextEn: 'You are on the line with the KSIA Airport Command Dispatcher with alarms sounding in the background.',
            contextAr: 'أنت على الهاتف مع مأمور مركز عمليات المطار وصفارات الإنذار تدوي في الخلفية.',
            options: [
              {
                id: 'cm_exec1_a',
                textEn: 'Report: HQ Tower 1 Level 4 Boardroom (L), AV Rack Electrical Fire & Heavy Smoke (N), 55 Staff Evacuating 1 Evac-Chair User (N), Stairwell B Compromised (H).',
                textAr: 'إرسال: برج الإدارة الدور 4 قاعة الاجتماعات (الموقع)، حريق كابينة أجهزة ودخان كثيف (النوع)، 55 موظفاً وكرسي إخلاء (العدد)، تسرب دخان في درج ب (الخطر).',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Spot on! Flawless LNNH structure informs dispatch that Stairwell B is contaminated and mobility transport is active.',
                feedbackAr: 'دقة واحترافية متكاملة! تقرير LNNH ينبه العمليات لتلوث الدرج (ب) واستخدام كرسي الإخلاء في الدرج (أ).'
              },
              {
                id: 'cm_exec1_b',
                textEn: 'Report: Level 4 Boardroom (L), Serious electrical fire (N), All 55 occupants leaving (N), please send full response.',
                textAr: 'إرسال: قاعة الدور الرابع (الموقع)، حريق كهربائي خطير (النوع)، خروج كافة الـ 55 موظفاً (العدد)، أرسلوا دعماً كاملاً.',
                isCorrect: false,
                score: 30,
                feedbackEn: 'Incomplete LNNH: Omits building name, the mobility Evac-Chair patient, and Stairwell B smoke compromise.',
                feedbackAr: 'غير مكتمل وفق LNNH: أهمل اسم البرج ومريض كرسي الإخلاء وتلوث الدرج (ب) بالدخان.'
              },
              {
                id: 'cm_exec1_c',
                textEn: 'Report: HQ Tower (L), Fire alarm activated (N), Executives moving out, need assistance at lobby.',
                textAr: 'إرسال: برج الإدارة (الموقع)، انطلاق إنذار الحريق (النوع)، خروج المسؤولين، نطلب مساعدة في البهو.',
                isCorrect: false,
                score: 25,
                feedbackEn: 'Lacks floor level, exact headcount, hazard status, and mobility evacuation intelligence.',
                feedbackAr: 'يفتقر لتحديد الدور والعدد الرقمي الدقيق وحالة المخاطر ونقل ذوي الإعاقة.'
              },
              {
                id: 'cm_exec1_d',
                textEn: 'Report: Boardroom suite (L), Fire burning (N), Send Civil Defense to Stairwell B immediately.',
                textAr: 'إرسال: جناح الاجتماعات (الموقع)، حريق يشتعل (النوع)، وجهوا الدفاع المدني للدرج ب فوراً.',
                isCorrect: false,
                score: 20,
                dangerFlag: true,
                feedbackEn: 'Fails to alert dispatch that Stairwell B is compromised with smoke, directing rescuers into danger.',
                feedbackAr: 'خطأ خطير! أهمل إبلاغ العمليات بأن الدرج (ب) ملوث بالدخان ووجه رجال الإطفاء لمسار خطر.'
              }
            ]
          }
        }
      },
      {
        id: 'exec_s2',
        stageNumber: 2,
        stageTitleEn: 'Stage 2: Assembly Roll Call & Full Incident Command Handover',
        stageTitleAr: 'المرحلة 2: حصر الموظفين بنقطة التجمع وتسليم القيادة للدفاع المدني',
        situationEn: 'The team successfully guides the Evac-Chair down clean Stairwell A to the Ground Exterior Assembly Area. The KSIA Civil Defense Incident Commander arrives on scene, and the team executes formal command transfer.',
        situationAr: 'نجح الفريق في إنزال كرسي الإخلاء عبر الدرج (أ) والوصول لنقطة التجمع الخارجية بسلام، ووصل قائد الدفاع المدني للموقع لتسلم قيادة الحادث.',
        decisions: {
          teamLeader: {
            roleId: 'teamLeader',
            questionEn: 'How should the Team Leader execute formal command transfer to Civil Defense at the assembly point?',
            questionAr: 'كيف ينفذ قائد الفريق إجراءات تسليم القيادة الرسمية للدفاع المدني بنقطة التجمع؟',
            contextEn: 'The Civil Defense Incident Commander approaches holding a tactical clipboard and floorplate tablet.',
            contextAr: 'اقترب قائد فرقة الدفاع المدني ومعه لوحة العمليات التكتيكية ومخطط المبنى الإلكتروني.',
            options: [
              {
                id: 'tl_exec2_a',
                textEn: 'Tell Civil Defense: "Most people made it down, but go search all the restrooms yourself to make sure".',
                textAr: 'إخبار الدفاع المدني: "معظم الناس نزلوا، ولكن اذهبوا وفتشوا جميع دورات المياه بأنفسكم للتأكد".',
                isCorrect: false,
                score: 25,
                dangerFlag: true,
                feedbackEn: 'Vague accountability forces firefighters into unnecessary hazardous searches in burning buildings.',
                feedbackAr: 'عدم تأكيد الحصر يجبر رجال الإطفاء على المخاطرة بأرواحهم للبحث عن مفقودين غير موجودين.'
              },
              {
                id: 'tl_exec2_b',
                textEn: 'Deliver the full tactical status: Seat of fire in 4th-floor boardroom, 55 occupants accounted for, and power isolated.',
                textAr: 'تسليم الموقف التكتيكي كاملاً: موقع الحريق بقاعة الدور الرابع، حصر 55 موظفاً بالكامل، وعزل القاطع الكهربائي.',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Correct! Crisp, structured handover gives firefighters exact intelligence to suppress the seat of fire without searching empty floors.',
                feedbackAr: 'صحيح ومثالي! تسليم الموقف التكتيكي الدقيق يريح رجال الإطفاء ويركز جهودهم على البؤرة دون تشتت في تفتيش مكاتب خالية.'
              },
              {
                id: 'tl_exec2_c',
                textEn: 'Advise Civil Defense that office command will continue directing interior firefighting actions from the lawn.',
                textAr: 'إبلاغ الدفاع المدني بأن قيادة المكاتب ستواصل توجيه عمليات إطفاء الحريق الداخلي من الحديقة.',
                isCorrect: false,
                score: 15,
                feedbackEn: 'Once Civil Defense arrives on scene, unified structural command legally transfers to the professional brigade.',
                feedbackAr: 'فور وصول الدفاع المدني، تنتقل القيادة التكتيكية للفرقة المتخصصة نظاماً.'
              },
              {
                id: 'tl_exec2_d',
                textEn: 'Dismiss all 55 employees to return to their personal vehicles and leave the airport immediately.',
                textAr: 'صرف جميع الموظفين الـ 55 للعودة لسياراتهم ومغادرة حرم المطار فوراً قبل الحصر النهائي.',
                isCorrect: false,
                score: 15,
                dangerFlag: true,
                feedbackEn: 'Dismissing occupants before official roll call completion disrupts multi-agency accountability.',
                feedbackAr: 'صرف الموظفين قبل اكتمال الحصر الرسمي يعطل توثيق سلامة الأرواح لدى إدارة المطار.'
              }
            ]
          },
          evacuation: {
            roleId: 'evacuation',
            questionEn: 'How should Evacuation finalize the roll-call and accountability check at the assembly point?',
            questionAr: 'كيف ينهي مسؤول الإخلاء عملية حصر الموظفين وتأكيد القوائم بنقطة التجمع؟',
            contextEn: 'Dozens of office workers are mingling across the assembly parking lot.',
            contextAr: 'عشرات الموظفين يقفون في مواقف نقطة التجمع ويتحدثون مع بعضهم البعض.',
            options: [
              {
                id: 'ev_exec2_a',
                textEn: 'Conduct an organized headcount against the department roster and confirm all 55 occupants with the Team Leader.',
                textAr: 'إجراء حصر منظم ومطابقته مع كشف أسماء الإدارة وتأكيد سلامة جميع الـ 55 موظفاً مع قائد الفريق.',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Correct! Systematic muster accountability verifies zero occupants remain trapped in the burning structure.',
                feedbackAr: 'صحيح ومثالي! مطابقة كشف الحصر الدقيق تضمن عدم بقاء أي شخص محاصر داخل المبنى المحترق.'
              },
              {
                id: 'ev_exec2_b',
                textEn: 'Count how many cars are parked in the lot and assume each car equals exactly one safe person.',
                textAr: 'عد السيارات المتوقفة بالمواقف وافتراض أن كل سيارة تعادل شخصاً واحداً نجا بسلام.',
                isCorrect: false,
                score: 15,
                dangerFlag: true,
                feedbackEn: 'Vehicle counts are completely inaccurate and leave trapped staff unaccounted for.',
                feedbackAr: 'عد السيارات طريقة خاطئة وغير دقيقة قد تترك موظفين محاصرين دون إنقاذ.'
              },
              {
                id: 'ev_exec2_c',
                textEn: 'Conduct roll call by having everyone shout their names at the same time.',
                textAr: 'إجراء الحصر بطلب صراخ الجميع بأسمائهم في وقت واحد في ساحة المواقف.',
                isCorrect: false,
                score: 10,
                feedbackEn: 'Simultaneous shouting creates chaos and prevents accurate tracking of individual personnel.',
                feedbackAr: 'الصراخ الجماعي يحدث فوضى ويمنع التحقق الفردي الدقيق من سلامة كل موظف.'
              },
              {
                id: 'ev_exec2_d',
                textEn: 'Allow three executives to walk back into the burning tower to get their forgotten coats.',
                textAr: 'السماح لثلاثة مسؤولين بالعودة للبرج المحترق لجلب معاطفهم التي نسوها بالداخل.',
                isCorrect: false,
                score: 0,
                dangerFlag: true,
                feedbackEn: 'Permitting re-entry before building All-Clear causes entrapment and deaths.',
                feedbackAr: 'السماح بالعودة قبل إعلان خلو المبنى رسمياً يتسبب في حصارهم واختناقهم.'
              }
            ]
          },
          casualtyCare: {
            roleId: 'casualtyCare',
            questionEn: 'How should Casualty Care hand over the two casualties to arriving airport ambulance paramedics?',
            questionAr: 'كيف يسلم مسؤول الإسعافات الحالتين المصابتين لطاقم إسعاف المطار الواصل للموقع؟',
            contextEn: 'Airport paramedics set up a triage area at the assembly point gate.',
            contextAr: 'أقام مسعفو المطار منطقة فرز طبي عند بوابة نقطة التجمع الخارجية.',
            options: [
              {
                id: 'cc_exec2_a',
                textEn: 'Tell the paramedics both patients are totally fine and tell the medics to drive back to the clinic.',
                textAr: 'إخبار طاقم الإسعاف بأن الحالتين على ما يرام تماماً والطلب منهم العودة للعيادة دون فحص.',
                isCorrect: false,
                score: 20,
                dangerFlag: true,
                feedbackEn: 'Dismissing patients without clinical assessment risks missed smoke inhalation complications.',
                feedbackAr: 'صرف المسعفين دون فحص طبي قد يخفي مضاعفات خطيرة لاستنشاق الدخان السام.'
              },
              {
                id: 'cc_exec2_b',
                textEn: 'Advise the paramedics to evaluate only the executive while ignoring the wheelchair user.',
                textAr: 'نصح المسعفين بفحص المسؤول الإداري فقط وتجاهل موظف الكرسي المتحرك.',
                isCorrect: false,
                score: 15,
                feedbackEn: 'All individuals involved in emergency evacuations must receive clinical triage assessments.',
                feedbackAr: 'جميع من شاركوا في الإخلاء الطارئ يجب أن يخضعوا للتقييم والفرز الطبي.'
              },
              {
                id: 'cc_exec2_c',
                textEn: 'Deliver ATMIST report: Wheelchair colleague uninjured in safe transfer; executive stable after acute panic, vitals monitored.',
                textAr: 'تقديم تقرير ATMIST: زميل الكرسي سليم وتم نقله بأمان، والمسؤول مستقر بعد نوبة الهلع مع استمرار فحص علاماته.',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Correct! Structured medical handover (ATMIST) ensures uninterrupted clinical continuity of care.',
                feedbackAr: 'صحيح ومثالي! التسليم الطبي المنظم وفق (ATMIST) يضمن استمرارية الرعاية ومتابعة الحالات بنجاح.'
              },
              {
                id: 'cc_exec2_d',
                textEn: 'Have the casualties wait in an unventilated security guard booth without monitoring.',
                textAr: 'إبقاء المصابين داخل كابينة أمنية غير مهواة دون أي مراقبة طبية لعلاماتهما الحيوية.',
                isCorrect: false,
                score: 15,
                feedbackEn: 'Leaving patients in confined unmonitored spaces risks undetected clinical decompensation.',
                feedbackAr: 'ترك المرضى في أماكن مغلقة دون مراقبة قد يؤدي لتدهور حالتهم الصحية دون انتباه.'
              }
            ]
          },
          fireSuppression: {
            roleId: 'fireSuppression',
            questionEn: 'What structural briefing must Fire Suppression give to the Civil Defense entry team?',
            questionAr: 'ما هي المعلومات الإنشائية التي يجب على مسؤول الإطفاء تقديمها لفرقة اقتحام الدفاع المدني؟',
            contextEn: 'The Civil Defense breathing apparatus team is donning SCBA masks before entering the lobby.',
            contextAr: 'يرتدي رجال إطفاء الدفاع المدني أقنعة التنفس (SCBA) استعداداً لدخول بهو المبنى.',
            options: [
              {
                id: 'fs_exec2_a',
                textEn: 'Brief: Level 4 Boardroom door is latched shut, sub-panel power is isolated, and Stairwell A is the clear attack route.',
                textAr: 'توضيح: باب قاعة الدور الرابع مغلق بإحكام، القاطع الكهربائي مفصول، والدرج (أ) هو المسار الآمن للصعود.',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Correct! Accurate utility status and stairwell access guidance allows safe, rapid firefighting attack.',
                feedbackAr: 'صحيح ومثالي! توضيح حالة الأبواب والقواطع ومسار الدرج النظيف يحمي رجال الإطفاء ويسرع الإخماد.'
              },
              {
                id: 'fs_exec2_b',
                textEn: 'Tell the firefighters that there is no fire at all and they should remove their breathing masks.',
                textAr: 'إخبار رجال الإطفاء بأنه لا يوجد حريق أصلاً ونصحهم بنزع أقنعة التنفس قبل الدخول.',
                isCorrect: false,
                score: 0,
                dangerFlag: true,
                feedbackEn: 'Deceiving responders into toxic smoke zones causes severe respiratory injury.',
                feedbackAr: 'خداع فرق الإطفاء بنزع الأقنعة يعرضهم للاختناق بالغازات السامة.'
              },
              {
                id: 'fs_exec2_c',
                textEn: 'Advise firefighters to enter through smoke-contaminated Stairwell B to save walking distance.',
                textAr: 'نصح رجال الإطفاء بالدخول عبر الدرج (ب) الملوث بالدخان لتوفير مسافة المشي.',
                isCorrect: false,
                score: 15,
                dangerFlag: true,
                feedbackEn: 'Directing entry teams into compromised stairwells exposes them to zero-visibility thermal plumes.',
                feedbackAr: 'توجيه فرق الاقتحام لدرج ملوث بالدخان يعرضهم لتيارات حرارية خطيرة وانعدام الرؤية.'
              },
              {
                id: 'fs_exec2_d',
                textEn: 'Inform the firefighters that you left your personal laptop on Level 4 and request they fetch it first.',
                textAr: 'إبلاغ رجال الإطفاء بأنك نسيت لابتوبك الشخصي في الدور الرابع ومطالبتهم بإحضاره أولاً.',
                isCorrect: false,
                score: 10,
                feedbackEn: 'Requesting personal property retrieval distracts entry teams from structural suppression objectives.',
                feedbackAr: 'طلب استرجاع ممتلكات شخصية يشتت فرق الإطفاء عن مهام إخماد الحريق وتأمين المبنى.'
              }
            ]
          },
          communications: {
            roleId: 'communications',
            questionEn: 'How must Communications deliver the final comprehensive LNNH closeout report to AOCC?',
            questionAr: 'كيف يرسل مسؤول الاتصالات التقرير الختامي الشامل (LNNH) لمركز عمليات المطار؟',
            contextEn: 'You are closing the official ERT log with the Airport Operations Control Center supervisor.',
            contextAr: 'أنت الآن تغلق السجل الرسمي لعمليات الطوارئ مع مشرف مركز عمليات المطار (AOCC).',
            options: [
              {
                id: 'cm_exec2_a',
                textEn: 'Transmit: HQ Tower 1 (L), Fire resolved (N), Staff outside safely (N), Closing communication channel.',
                textAr: 'إرسال: برج الإدارة (الموقع)، الحريق تم حله (النوع)، الموظفون بالخارج بأمان (العدد)، إغلاق القناة.',
                isCorrect: false,
                score: 30,
                feedbackEn: 'Incomplete LNNH: Lacks specific muster sector location, exact headcount (55), and residual hazard status.',
                feedbackAr: 'تقرير LNNH غير مكتمل: يفتقر لموقع التجمع الدقيق والعدد الرقمي المحصور (55) وتأكيد خلو المخاطر.'
              },
              {
                id: 'cm_exec2_b',
                textEn: 'Transmit: HQ Tower 1 Assembly Point (L), 4th Fl Fire Under CD Control (N), All 55 Staff Accounted Zero Fatalities (N), Sector Clear (H).',
                textAr: 'إرسال: نقطة تجمع برج الإدارة (الموقع)، حريق الدور 4 تحت سيطرة الدفاع المدني (النوع)، حصر 55 موظفاً دون وفيات (العدد)، الموقع مؤمن بالكامل (الخطر).',
                isCorrect: true,
                score: 100,
                feedbackEn: 'Spot on! Full, professional LNNH closing dossier confirms life safety was 100% achieved.',
                feedbackAr: 'دقة واحترافية متناهية! إغلاق البلاغ بصيغة LNNH المتكاملة يوثق نجاح مهمة حماية الأرواح بالكامل.'
              },
              {
                id: 'cm_exec2_c',
                textEn: 'Transmit: Airport Grounds (L), Emergency concluded (N), 55 occupants (N), ready for normal duties.',
                textAr: 'إرسال: حرم المطار (الموقع)، انتهاء حالة الطوارئ (النوع)، 55 موظفاً (العدد)، جاهزون للعمل المعتاد.',
                isCorrect: false,
                score: 25,
                feedbackEn: 'Vague location coordinates and omits fire department handover details.',
                feedbackAr: 'موقع غير محدد بدقة وإغفال لتفاصيل تسليم موقع الحادث للدفاع المدني.'
              },
              {
                id: 'cm_exec2_d',
                textEn: 'Transmit: Level 4 Boardroom (L), Fire out (N), Everyone left the building (N), Disconnecting radio.',
                textAr: 'إرسال: قاعة الدور 4 (الموقع)، الحريق انتهى (النوع)، الجميع غادروا المبنى (العدد)، فصل اللاسلكي.',
                isCorrect: false,
                score: 25,
                feedbackEn: 'Reports from the incident origin instead of current assembly post and omits hazard mitigation status.',
                feedbackAr: 'يحدد موقع الحريق الأصلي بدلاً من نقطة التجمع الحالية ويفتقر لتوثيق تأمين المخاطر.'
              }
            ]
          }
        }
      }
    ]
  }
];
