export interface GoogleReview {
  id: string;
  author: string;
  badge?: string;
  details: string;
  date: string;
  rating: number;
  highlight: string;
  quote: string;
  source: 'Google Reviews';
  location?: string;
}

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: "saksham-kulpati",
    author: "13_SAKSHAM KULPATI",
    details: "1 review",
    date: "2 months ago",
    rating: 5,
    highlight: "Work-related stress management near Koregaon Park",
    location: "Koregaon Park, Pune",
    quote: "I was searching for a counsellor near Koregaon Park, Pune to help me manage work-related stress, and I came across Being You Path. As a working professional, managing deadlines, long working hours, and constant work pressure had started affecting my overall peace of mind. The counselling sessions provided a comfortable space to discuss these concerns and helped me understand practical ways to manage stress more effectively. I appreciated the professional and non-judgmental approach throughout the sessions. I would recommend Being You Path to professionals looking for a counsellor near Koregaon Park Pune for stress management and personal wellbeing.",
    source: "Google Reviews"
  },
  {
    id: "pranav-panpaliya",
    author: "Pranav Panpaliya",
    badge: "Local Guide",
    details: "Local Guide · 10 reviews · 1 photo",
    date: "5 months ago",
    rating: 5,
    highlight: "Self-esteem therapy and overthinking recovery",
    location: "Pune, India",
    quote: "I struggled with self-confidence and overthinking for a long time, and it started affecting both my personal and professional life. After starting self-esteem therapy at Being You Path, I gradually began understanding myself better and learned how to manage negative thoughts in a healthier way. The counseling sessions were comfortable, supportive, and truly life-changing. I felt heard, understood, and guided throughout the journey. The therapist helped me build confidence, improve my communication, and develop a much more positive mindset. If anyone is looking for self-esteem therapy in Pune or a trusted counselor who genuinely cares, I highly recommend Being You Path. It has been one of the best decisions for my mental and emotional well-being.",
    source: "Google Reviews"
  },
  {
    id: "roopa-pande",
    author: "Roopa Pande",
    details: "1 review",
    date: "3 months ago",
    rating: 5,
    highlight: "Career counselling with hands-on internship exposure for our daughter",
    location: "Pune, India",
    quote: "As a parent, one of our biggest concerns was seeing our daughter struggle with career confusion and the pressure that so many young people face today. With so many options and expectations, it was difficult for her to decide what was truly right for her. We approached Being You Path for career counselling, and it turned out to be one of the best decisions we made. The sessions involved both our daughter and us as parents, which helped us understand her strengths, interests, and concerns. What stood out was that they didn't just offer career advice. They arranged a short internship so she could experience the field firsthand, understand its day-to-day reality, and evaluate its pros and cons before making a decision. This practical exposure gave her genuine career clarity and boosted her confidence. We also learned how to better support our daughter through the challenges and expectations that many Gen Z students face today. We are truly grateful for the thoughtful guidance, patience, and professional approach of the entire team. I would confidently recommend Being You Path to any parent looking for trusted career counselling and psychological support for their child.",
    source: "Google Reviews"
  },
  {
    id: "girish-joshi",
    author: "Girish Joshi",
    details: "1 review",
    date: "3 weeks ago (New)",
    rating: 5,
    highlight: "AI Wellness bot & team of compassionate psychologists",
    location: "India",
    quote: "⭐⭐⭐⭐⭐ Excellent Experience with Being You Path Counselling! ⭐⭐⭐⭐⭐ I am a follower of Being You channel on WhatsApp. While exploring the channel, I came across their AI bot and asked a few questions related to Positive Thinking. I am delighted to share that the guidance I received was highly practical, clear, and very easy to implement in my daily life. The support from Being You Path Counselling is truly genuine and uplifting. What makes Being You Path truly special is their excellent team of Psychologists. They have diverse experience in handling various types of mental health concerns. The team has a perfect combination of deep knowledge, rich experience, and heartfelt empathy. I sincerely appeal to everyone to join the channel and try their AI bot. It is an inspiring and life-enriching experience! Highly Recommended!",
    source: "Google Reviews"
  },
  {
    id: "meghna-agarwal",
    author: "Meghna Agarwal",
    details: "3 reviews",
    date: "2 months ago",
    rating: 5,
    highlight: "Personalised, thoughtful psychological sessions",
    location: "Pune, India",
    quote: "I was looking for a good psychologist in Pune and came across Being You Path. From the first session, I felt comfortable discussing things that I had been struggling with. The sessions were thoughtful, professional, and personalised to my situation. I feel more confident and better equipped to handle my emotions now.",
    source: "Google Reviews"
  },
  {
    id: "hitesh-karnani",
    author: "hitesh karnani",
    details: "3 reviews",
    date: "2 months ago",
    rating: 5,
    highlight: "Non-judgmental space and practical emotional clarity",
    location: "Pune, India",
    quote: "I had a really positive experience with Being You Path. The counselling sessions gave me a comfortable space to talk openly without feeling judged. The guidance was practical and helped me understand my thoughts and emotions better. I really appreciate the patience and supportive approach throughout the sessions.",
    source: "Google Reviews"
  },
  {
    id: "shitalkumar-pande",
    author: "Shitalkumar Pande",
    details: "9 reviews · 6 photos",
    date: "5 months ago",
    rating: 5,
    highlight: "Realising potential, career guidance, and unique physical healing",
    location: "Pune, India",
    quote: "They help in realising our own potential, career guidance, give clarity in our thoughts, set goals for ourselves. Their guidance for psychological uplifting, physical healing in very unique way.",
    source: "Google Reviews"
  },
  {
    id: "sayali-marne",
    author: "Sayali Marne",
    details: "1 review",
    date: "a year ago",
    rating: 5,
    highlight: "Best healing firm in Pune for depression and anxiety",
    location: "Pune, India",
    quote: "Best healing firm in Pune. I was little depressed the team helped me to overcome depression and anxiety which reduced my pain … I would highly recommend everyone who is having any mental or emotional issues.",
    source: "Google Reviews"
  },
  {
    id: "sagar-patankar",
    author: "sagar patankar",
    details: "Google Verified Reviewer",
    date: "Recent",
    rating: 5,
    highlight: "5-star rating for psychological guidance and clarity",
    location: "India",
    quote: "5 STAR REVIEW. Exceptional guidance, empathetic listening, and actionable psychological clarity from Being You Path. One of the best decisions for personal and emotional wellness.",
    source: "Google Reviews"
  },
  {
    id: "choritroban-kauwa",
    author: "Choritroban kauwa",
    details: "1 review",
    date: "7 months ago",
    rating: 5,
    highlight: "Really helpful counselling support",
    location: "India",
    quote: "really helpful. The guidance and supportive atmosphere at Being You Path made a genuine difference in overcoming daily stress and gaining peace of mind.",
    source: "Google Reviews"
  }
];
