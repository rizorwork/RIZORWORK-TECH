import React, { useState } from 'react';
import { Send, AlertCircle, CheckCircle2, Info, User, Printer, RotateCcw } from 'lucide-react';
import { ConsentCheckbox } from './components/ConsentCheckbox';
import { SignaturePad } from './components/SignaturePad';
import { Logo } from './components/Logo';
import {
  FORM_TITLE,
  TREATMENT_INFO,
  CONTRAINDICATIONS_TEXT,
  PRECAUTIONS_TEXT,
  PRE_TREATMENT,
  POST_TREATMENT,
  POST_CARE_WARNING,
  CONSENT_ITEMS,
  RECIPIENT_EMAIL
} from './constants';

export default function App() {
  const [consents, setConsents] = useState<Record<string, boolean>>(
    CONSENT_ITEMS.reduce((acc, item) => ({ ...acc, [item.id]: false }), {})
  );
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    signature: null as string | null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleConsentChange = (id: string, checked: boolean) => {
    setConsents(prev => ({ ...prev, [id]: checked }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignatureSave = (dataUrl: string | null) => {
    setFormData(prev => ({ ...prev, signature: dataUrl }));
  };

  const validateForm = () => {
    // Check basic info
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.date) {
      alert('Please fill in all required personal information fields.');
      return false;
    }
    // Check consents
    const uncheckedConsents = CONSENT_ITEMS.filter(item => item.required && !consents[item.id]);
    if (uncheckedConsents.length > 0) {
      alert(`Please acknowledge all consent statements to proceed. (${uncheckedConsents.length} remaining)`);
      return false;
    }
    // Check signature
    if (!formData.signature) {
      alert('Please sign the form before submitting.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call / Email sending
    setTimeout(() => {
      console.log('Form Data:', { ...formData, consents });
      
      // Construct Mailto Link
      const subject = `BioRePeelCl3 Consent: ${formData.firstName} ${formData.lastName}`;
      const consentSummary = CONSENT_ITEMS.map(item => 
        `[${consents[item.id] ? 'X' : ' '}] ${item.text.substring(0, 50)}...`
      ).join('\n');
      
      const body = `
PATIENT DETAILS
Name: ${formData.firstName} ${formData.lastName}
Date: ${formData.date}
Email: ${formData.email}
Phone: ${formData.phone}

CONSENTS
${consentSummary}

--
Signed Digitally via Web Form
      `.trim();

      // Try to open email client
      // Add user to CC so they receive a confirmation copy
      const mailtoLink = `mailto:${RECIPIENT_EMAIL}?cc=${encodeURIComponent(formData.email)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;

      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handlePrint = () => {
    window.print();
  };

  const resetForm = () => {
    setIsSuccess(false);
    setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        date: new Date().toISOString().split('T')[0],
        signature: null
    });
    setConsents(CONSENT_ITEMS.reduce((acc, item) => ({ ...acc, [item.id]: false }), {}));
    window.scrollTo(0,0);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 print:bg-white print:p-0">
      
      {/* Success Overlay - Visible on Screen when Success, Hidden on Print */}
      {isSuccess && (
        <div className="fixed inset-0 z-50 bg-slate-50 flex items-center justify-center p-4 print:hidden">
            <div className="bg-white max-w-md w-full p-8 rounded-xl shadow-lg text-center border border-slate-100">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={32} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Form Submitted</h2>
                <p className="text-slate-600 mb-6">
                    Thank you. Your consent form has been generated. Your email client should have opened to finalize sending the data. You have been CC'd on this email for your records.
                </p>
                <div className="flex flex-col gap-3">
                    <button 
                        onClick={handlePrint}
                        className="flex items-center justify-center gap-2 w-full bg-slate-800 text-white px-6 py-3 rounded-lg hover:bg-slate-900 transition-colors"
                    >
                        <Printer size={18} /> Print Filled Form
                    </button>
                    <button 
                        onClick={resetForm}
                        className="flex items-center justify-center gap-2 w-full bg-white border border-slate-300 text-slate-700 px-6 py-3 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                        <RotateCcw size={18} /> Start New Form
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Main Form Container - Hidden on Screen if Success, Block on Print */}
      <div className={`max-w-4xl mx-auto print:max-w-none print:w-full ${isSuccess ? 'hidden print:block' : ''}`}>
        
        {/* Header */}
        <div className="bg-white rounded-t-xl shadow-sm p-8 border-b border-slate-100 print:shadow-none print:border-none print:p-0 print:mb-6">
          <div className="flex flex-col items-center justify-center gap-6 mb-8 print:mb-4">
             <div className="flex items-center justify-center w-full">
                <Logo className="w-48 h-48 print:w-32 print:h-32" />
             </div>
             <div className="text-center flex-1 pt-2">
                <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-3 text-teal-900 print:text-4xl print:text-black">
                    BioRePeelCl3 Chemical Peeling
                </h1>
                <p className="text-lg text-slate-500 font-medium uppercase tracking-wide print:text-slate-700 print:text-base">
                    Treatment Consent Form
                </p>
             </div>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed border-l-4 border-teal-500 pl-4 bg-slate-50 py-3 rounded-r-lg print:bg-white print:pl-0 print:border-l-0 print:text-justify">
            {FORM_TITLE}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-b-xl overflow-hidden print:shadow-none print:rounded-none">
          
          {/* Patient Info Section */}
          <div className="p-6 sm:p-8 bg-slate-50/50 border-b border-slate-100 print:bg-white print:p-0 print:border-b-2 print:border-slate-200 print:mb-6">
            <h2 className="flex items-center text-lg font-semibold text-slate-800 mb-4 print:text-black">
              <User className="w-5 h-5 mr-2 text-teal-600 print:hidden" />
              Patient Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 print:grid-cols-2 print:gap-x-8 print:gap-y-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1 print:text-black">First Name</label>
                <input
                  required
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all print:border-none print:px-0 print:py-0 print:font-semibold print:text-black"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1 print:text-black">Last Name</label>
                <input
                  required
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all print:border-none print:px-0 print:py-0 print:font-semibold print:text-black"
                  placeholder="Enter last name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1 print:text-black">Email</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all print:border-none print:px-0 print:py-0 print:font-semibold print:text-black"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1 print:text-black">Phone</label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all print:border-none print:px-0 print:py-0 print:font-semibold print:text-black"
                  placeholder="Enter phone number"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1 print:text-black">Date</label>
                <input
                  required
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all print:border-none print:px-0 print:py-0 print:font-semibold print:text-black"
                />
              </div>
            </div>
          </div>

          {/* Information Sections */}
          <div className="p-6 sm:p-8 space-y-8 print:p-0 print:space-y-4">
            
            {/* Treatment Info */}
            <section className="print:break-inside-avoid">
              <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center print:text-black">
                <Info className="w-5 h-5 mr-2 text-teal-600 print:hidden" />
                Treatment Information
              </h3>
              <p className="text-sm text-slate-600 whitespace-pre-line leading-relaxed print:text-black print:text-justify">
                {TREATMENT_INFO}
              </p>
            </section>

            {/* Contraindications & Precautions */}
            <div className="grid md:grid-cols-2 gap-8 print:block print:space-y-4">
              <section className="print:break-inside-avoid">
                <h3 className="text-base font-semibold text-red-600 mb-3 flex items-center print:text-black">
                  <AlertCircle className="w-4 h-4 mr-2 print:hidden" />
                  Contraindications
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed print:text-black">
                  {CONTRAINDICATIONS_TEXT}
                </p>
              </section>
              <section className="print:break-inside-avoid">
                <h3 className="text-base font-semibold text-amber-600 mb-3 flex items-center print:text-black">
                  <AlertCircle className="w-4 h-4 mr-2 print:hidden" />
                  Precautions
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed print:text-black">
                  {PRECAUTIONS_TEXT}
                </p>
              </section>
            </div>

            {/* Pre/Post Tables */}
            <div className="grid lg:grid-cols-2 gap-8 print:grid-cols-2 print:gap-4">
              
              {/* Pre Treatment */}
              <div className="border rounded-lg overflow-hidden print:border-slate-300">
                <div className="bg-slate-100 px-4 py-2 border-b font-medium text-slate-700 print:bg-gray-100 print:text-black print:border-slate-300">Avoid Pre-Treatment</div>
                <div className="divide-y divide-slate-100 print:divide-slate-300">
                  {PRE_TREATMENT.map((item, i) => (
                    <div key={i} className="flex justify-between px-4 py-3 text-sm">
                      <span className="text-slate-600 print:text-black">{item.item}</span>
                      <span className="font-medium text-slate-800 ml-4 text-right whitespace-nowrap print:text-black">{item.timing}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Post Treatment */}
              <div className="border rounded-lg overflow-hidden print:border-slate-300">
                <div className="bg-slate-100 px-4 py-2 border-b font-medium text-slate-700 print:bg-gray-100 print:text-black print:border-slate-300">Avoid Post-Treatment</div>
                <div className="divide-y divide-slate-100 print:divide-slate-300">
                  {POST_TREATMENT.map((item, i) => (
                    <div key={i} className="flex justify-between px-4 py-3 text-sm">
                      <span className="text-slate-600 print:text-black">{item.item}</span>
                      <span className="font-medium text-slate-800 ml-4 text-right whitespace-nowrap print:text-black">{item.timing}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

             <div className="bg-amber-50 border border-amber-100 p-4 rounded-lg print:bg-white print:border print:border-slate-300 print:break-inside-avoid">
                <h4 className="font-semibold text-amber-800 mb-1 print:text-black">Post-Care Warning</h4>
                <p className="text-sm text-amber-800/80 leading-relaxed print:text-black">{POST_CARE_WARNING}</p>
             </div>

            {/* Consents */}
            <section className="space-y-4 pt-4 border-t border-slate-100 print:break-before-page">
              <h3 className="text-xl font-bold text-slate-900 mb-6 print:text-black">Consent & Acknowledgement</h3>
              <div className="space-y-1 bg-gray-50 p-4 rounded-xl border border-gray-200 print:bg-white print:border-none print:p-0">
                {CONSENT_ITEMS.map((item) => (
                  <ConsentCheckbox
                    key={item.id}
                    id={item.id}
                    text={item.text}
                    checked={consents[item.id]}
                    onChange={handleConsentChange}
                  />
                ))}
              </div>
            </section>

            {/* Signature Section */}
            <section className="pt-6 border-t border-slate-100 print:break-inside-avoid">
               <div className="max-w-lg">
                   <label className="block text-sm font-medium text-slate-700 mb-2 print:text-black">Patient Signature</label>
                   <SignaturePad onSave={handleSignatureSave} />
                   <p className="text-xs text-slate-400 mt-2 print:hidden">Use your mouse or finger to sign in the box above.</p>
               </div>
            </section>

          </div>

          {/* Footer Action */}
          <div className="bg-slate-50 px-6 py-6 sm:px-8 border-t border-slate-200 flex justify-end gap-4 print:hidden">
            <button
                type="button"
                onClick={handlePrint}
                className="flex items-center justify-center px-6 py-3 rounded-lg font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all shadow-sm"
            >
                <Printer className="mr-2 w-4 h-4" /> Print Form
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                flex items-center justify-center px-8 py-3 rounded-lg font-semibold text-white shadow-md transition-all
                ${isSubmitting 
                  ? 'bg-slate-400 cursor-not-allowed' 
                  : 'bg-teal-600 hover:bg-teal-700 hover:shadow-lg active:transform active:scale-95'}
              `}
            >
              {isSubmitting ? (
                <>Processing...</>
              ) : (
                <>
                  Submit Form <Send className="ml-2 w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
        
        <div className="text-center mt-8 text-slate-400 text-xs pb-8 print:hidden">
            <p>&copy; {new Date().getFullYear()} DK Aesthetics. All rights reserved.</p>
            <p className="mt-1">This is a secure digital form.</p>
        </div>

      </div>
    </div>
  );
}