import React from "react";
import '../css/faqs.css';

const Faqs = () => {
    return (
        <div className="container">
            <h3 className="mt-3 text-center faqs-title">FAQs</h3>

            <div class="accordion mb-5" id="accordionExample">
            <div class="accordion-item">
                <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    What is Semaglutide?
                </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                        Semaglutide is a medication approved for the treatment of type 2 diabetes and, 
                        in some cases, for chronic weight management. It mimics a hormone that targets 
                        areas of the brain that regulate appetite and food intake.
                </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Can Semaglutide cause constipation?
                </button>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                <p className="mb-2 faqs-info">Yes, constipation is a reported side effect of Semaglutide. 
                        Increasing your water intake, adding fiber-rich foods to your diet, and 
                        regular physical activity can help alleviate this issue. If constipation persists, 
                        please consult your healthcare provider.
                </p>                
                </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    I've been experiencing headaches since starting Semaglutide. Is this normal?
                </button>
                </h2>
                <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                <p className="mb-2 faqs-info">Headaches can occur as a side effect of Semaglutide, especially during the initial 
                        stages of treatment. Staying hydrated, maintaining a regular eating schedule, and managing 
                        stress can help. If headaches become severe or persistent, it's important to discuss this with 
                        your healthcare provider.</p>                
                </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseThree">
                    How can I manage nausea associated with Semaglutide?
                </button>
                </h2>
                <div id="collapseFour" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                <p className="mb-2 faqs-info">Nausea is a common side effect when beginning Semaglutide but often decreases over time. 
                        Eating smaller, more frequent meals and avoiding spicy or fatty foods can help manage nausea. 
                        Ginger tea or ginger candies may also provide relief. If nausea is severe or prevents you from eating 
                        and drinking, contact your healthcare provider.</p>               
                </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseThree">
                    What should I do if I experience diarrhea while taking Semaglutide?
                </button>
                </h2>
                <div id="collapseFive" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                <p className="mb-2 faqs-info">Diarrhea may occur with Semaglutide use. Ensure you stay hydrated by drinking plenty 
                        of fluids. Consider a bland diet until your symptoms improve and avoid high-fat, spicy foods. 
                        If diarrhea is severe, persistent, or accompanied by signs of dehydration, seek medical attention.</p>               
                </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseThree">
                    Method of Payment
                </button>
                </h2>
                <div id="collapseSix" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                <p className="mb-2 faqs-info">Electronic payments only. Acceptable forms of payment: Zelle, PayPal, Apply pay and Venmo. No cash payments.</p>               
                </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseThree">
                    Managing Side Effects
                </button>
                </h2>
                <div id="collapseSeven" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                <p className="mb-2 faqs-info"> Experiencing side effects can be challenging, but many can be managed with lifestyle 
                        adjustments and support from your healthcare team. Always report any persistent or severe 
                        side effects to your healthcare provider, as they can offer personalized advice and adjust your 
                        treatment plan if necessary.</p>
                    <p className="mb-2 faqs-info">Semaglutide is an effective medication for many individuals, but like all medications, 
                        it can cause side effects. Understanding these side effects and knowing how to manage them can 
                        make your treatment journey smoother. If you have any concerns or experience any side effects not listed here, 
                        please contact your healthcare provider.</p>
                    <p className="mb-2 faqs-info">This page is designed to provide helpful information to users of Semaglutide, addressing common side effects 
                        and offering tips for managing them.</p>             
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Faqs;