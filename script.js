document.addEventListener('DOMContentLoaded', () => {
    
    // --- Typing Animation ---
    const textElement = document.getElementById('typing-text');
    const textToType = "Zurich Gaming Innovation";
    let isTyping = true;
    let charIndex = 0;
    let typeSpeed = 100;
    let deleteSpeed = 50;
    let delayBetweenCycles = 2000;

    function typeEffect() {
        if (isTyping) {
            if (charIndex < textToType.length) {
                textElement.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(typeEffect, typeSpeed);
            } else {
                isTyping = false;
                setTimeout(typeEffect, delayBetweenCycles);
            }
        } else {
            if (charIndex > 0) {
                textElement.textContent = textToType.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(typeEffect, deleteSpeed);
            } else {
                isTyping = true;
                setTimeout(typeEffect, 500); // slight pause before re-typing
            }
        }
    }

    // Start typing animation
    setTimeout(typeEffect, 500);


    // --- Reviews Generation ---
    const countries = [
        { name: "Pakistan", flag: "🇵🇰" },
        { name: "India", flag: "🇮🇳" },
        { name: "USA", flag: "🇺🇸" },
        { name: "UK", flag: "🇬🇧" },
        { name: "Nigeria", flag: "🇳🇬" },
        { name: "Bangladesh", flag: "🇧🇩" }
    ];

    const names = {
        "Pakistan": ["Ahmed K.", "Fatima S.", "Tariq M.", "Zainab A.", "Bilal H."],
        "India": ["Rahul S.", "Priya P.", "Amit V.", "Sneha R.", "Vikram D."],
        "USA": ["Sarah J.", "Michael T.", "Emily R.", "David C.", "Jessica W."],
        "UK": ["James B.", "Charlotte M.", "William H.", "Olivia S.", "Thomas G."],
        "Nigeria": ["Chidi O.", "Amina Y.", "Emeka N.", "Ngozi A.", "Olu B."],
        "Bangladesh": ["Hasan R.", "Nusrat J.", "Arif I.", "Farhana K.", "Mehedi H."]
    };

    const reviewTexts = [
        "My console earnings have skyrocketed since I joined. Truly transparent!",
        "They handle everything perfectly. No stress, just steady revenue.",
        "The profit-sharing model is incredibly fair. Highly recommend them.",
        "I was skeptical at first, but they proved me wrong. Great results.",
        "Zero policy violations and great communication. A reliable partner.",
        "Publishing apps was never this easy. They take full responsibility.",
        "Consistent payouts and premium games. Couldn't ask for better.",
        "Zurich Gaming Innovation completely changed my developer journey.",
        "Very professional team. They actually care about your account safety.",
        "I just sit back and watch the revenue grow. Brilliant service."
    ];

    // Generate exactly 30 reviews
    const generatedReviews = [];
    for (let i = 0; i < 30; i++) {
        const countryObj = countries[i % countries.length];
        const countryNames = names[countryObj.name];
        const randomName = countryNames[Math.floor(Math.random() * countryNames.length)];
        const randomText = reviewTexts[Math.floor(Math.random() * reviewTexts.length)];
        
        generatedReviews.push({
            name: randomName,
            country: countryObj.name,
            flag: countryObj.flag,
            text: randomText,
            initials: randomName.split(' ')[0][0] + (randomName.split(' ')[1] ? randomName.split(' ')[1][0] : '')
        });
    }

    // Shuffle the array to mix countries
    for (let i = generatedReviews.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [generatedReviews[i], generatedReviews[j]] = [generatedReviews[j], generatedReviews[i]];
    }

    // Render Reviews
    const marqueeContainer = document.getElementById('review-marquee');
    
    function createReviewHTML(review) {
        // Generate 5 stars
        let starsHTML = '';
        for(let i=0; i<5; i++) {
            starsHTML += '<i class="ph-fill ph-star"></i>';
        }

        return `
            <div class="review-card">
                <div class="review-header">
                    <div class="reviewer-avatar">${review.initials}</div>
                    <div class="reviewer-info">
                        <h4>${review.name}</h4>
                        <span>${review.flag} ${review.country}</span>
                    </div>
                </div>
                <div class="review-stars">
                    ${starsHTML}
                </div>
                <p class="review-text">"${review.text}"</p>
            </div>
        `;
    }

    // Append to marquee
    let marqueeContent = '';
    generatedReviews.forEach(review => {
        marqueeContent += createReviewHTML(review);
    });

    // Duplicate content once to create seamless infinite scrolling effect
    if(marqueeContainer) {
        marqueeContainer.innerHTML = marqueeContent + marqueeContent;
    }

    // --- FAQ Accordion Logic ---
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const icon = item.querySelector('i');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const otherIcon = otherItem.querySelector('i');
                if(otherIcon) {
                    otherIcon.classList.remove('ph-minus');
                    otherIcon.classList.add('ph-plus');
                }
            });
            
            // If it wasn't active before, open it
            if (!isActive) {
                item.classList.add('active');
                if(icon) {
                    icon.classList.remove('ph-plus');
                    icon.classList.add('ph-minus');
                }
            }
        });
    });

});
