import { ConsentItemData, TreatmentInstruction } from './types';

export const FORM_TITLE = "INFORMATION FOR THE PATIENT/CLIENT ON THE TREATMENT OF CHEMICAL PEELING";

export const TREATMENT_INFO = `BioRePeelCl3 is a chemical peel exclusively for professional use, consisting of the skin application of a combination of acids, amino acids and vitamins that is used by the trained professional according to the purpose to be achieved and which has a chemical action on the skin, such as damaging the skin epidermis and influence the dermis to regularize the relative imperfections and pigmentation, accelerate cell turnover, regulate the sebum, reduce enlarged pores, improve the skin surface, stimulate fibroblasts proliferation and of collagen and elastin production and to give new vitality and freshness to the skin.

Biorepeelcl3 treatment can be used in the prevention and treatment of skin aging wrinkles reduction and overall improvement in the skin condition. Biorepeelcl3 product is appropriate for all phases of acne treatment and all Fitzpatric types.

The treatment is carried out according to different procedures depending on the product used (Biorepeelcl3 FND or Biorepeelc3 Body). Application and treatment must be done according to CMedAesthetics SRL protocols and training.`;

export const CONTRAINDICATIONS_TEXT = `Thorough consultation must be performed before Biorepeelcl3 procedure, in order to check all contraindications such as allergies, pregnancy and breastfeeding, cancer, Blood disorders (Hepatitis, HIV), autoimmune disorders, diabetes.

Do not use on patients/clients with an allergy to aspirin/salicylates.`;

export const PRECAUTIONS_TEXT = `Cold sores, Eczema/Dermatitis, Burns.
Medications such as: antibiotics, Natural Remedies (St Johns Wort), Contraception, Roaccutane, Topical Steroids.
Use of Retinol should be stopped 7 days before the treatment and can be used 14 days post treatment. AHA’s, BHA’s.`;

export const PRE_TREATMENT: TreatmentInstruction[] = [
  { item: "Exfoliating agents", timing: "48 hrs prior" },
  { item: "AHA’s, BHA’s, Retinol, Self-Tans", timing: "7 days prior" },
  { item: "Waxing, Hair removal or bleaching", timing: "7 days prior" },
  { item: "UV or Sun Exposure", timing: "14 days prior" },
  { item: "Notify if cold sores present within", timing: "14 days prior" },
];

export const POST_TREATMENT: TreatmentInstruction[] = [
  { item: "Non Mineral Make-Up", timing: "12 hours after (48h if microneedling)" },
  { item: "AHA’s, BHA’s, Retinol", timing: "14 days after" },
  { item: "Exercise, heat treatments", timing: "48 h after" },
  { item: "Waxing, Hair removal or bleaching", timing: "14 days after" },
  { item: "Sunbeds, Swimming, Sauna’s, Self-Tan", timing: "14 days after" },
];

export const POST_CARE_WARNING = `Do not peel, pick, scratch or scrape the skin, or any loose skin resulting from the treatment this must come off in its own time with no assistance, ignoring this advice can lead to scarring. 

Adverse reactions to chemical peels are rare but can include peeling, redness, scabbing, infection, recurrence of cold sores, and prolonged sensitivity to wind and sun.`;

export const CONSENT_ITEMS: ConsentItemData[] = [
  { id: "c1", required: true, text: "I have completed the client information form accurately." },
  { id: "c2", required: true, text: "I have been candid in revealing any condition that could prohibit this treatment, such as pregnancy, use of hormones, recent surgery, laser treatments, recent use of Retin A or use of Roaccutane within the past 6 months." },
  { id: "c3", required: true, text: "I understand that there are no guaranteed results from this treatment. Many variables such as age, sun damage, on-going sun exposure, smoking, excessive alcohol intake, climate, diet and water intake, skin thickness and sensitivity. I understand that I may or may not peel and each case is different." },
  { id: "c4", required: true, text: "Regardless of precautions taken, I acknowledge the possibility of an adverse reaction and accept sole responsibility for any medical care that may become necessary. I will contact the treatment provider if a reaction was to occur." },
  { id: "c5", required: true, text: "I will not scratch, pick, pull or abrase the treated skin." },
  { id: "c6", required: true, text: "I understand that direct exposure to the sun and use of sun bed is prohibited during the treatment and recovery time of the skin and that the use of a clinic recommended sun protection is mandatory when outside even in the winter." },
  { id: "c7", required: true, text: "I understand that for maximum results the recommended homecare routine must be followed. I understand that If I alter the routine or use products not recommended by the treatment provider the results could be altered or inhibited. I also understand it may take several treatments to obtain the desired results." },
  { id: "c8", required: true, text: "I understand that the following side effects may occur: Discomfort, Redness and inflammation, Hypo pigmentation, Hyper pigmentation, Skin Peeling or flaking for up to 14 days, Infection, Scarring, Acne Breakouts." },
  { id: "c9", required: true, text: "I agree to the treatment provider (or assistant) to take before and after images, before and after treatments." },
  { id: "c10", required: true, text: "I understand the goals of the treatment as well as the limitations and possible complications." },
  { id: "c11", required: true, text: "The treatment provider has provided me with pre and post treatment Instructions." },
  { id: "c12", required: true, text: "The treatment provider has provided the information and has answered all my questions concerning this procedure and I clearly understand the above information." },
  { id: "c13", required: true, text: "I understand that the practice of medicine and surgery is not an exact science and therefore that no guarantee can be given as to the results of the treatment referred to in this document. I accept and understand that the goal of this treatment is improvement, not perfection, and that there is no guarantee that the anticipated results will be achieved." },
];

export const RECIPIENT_EMAIL = "dkaestheticsgh@gmail.com";
