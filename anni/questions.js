const iceBreakers = `What does work-life balance mean to you?
What was the most surprising thing you've learned about me throughout our relationship?
What did you want to be when you were growing up?
In what ways do you think we're similar?
In what ways do you believe we are different?
What makes you feel confident?
What was your favorite toy that you had growing up?
What is your biggest fear?
What three qualities do you like about yourself?
What three qualities do you like most about me?
What is your idea of a dream vacation?
What is your idea of the perfect date night?
Do you enjoy alone time? And if so, why?
What is the first thing you noticed about me?
What do you remember about our first date?
Who's your 'celebrity hall pass' and why?
What is my most annoying habit?
What would you want to do with the money if we won the lottery?
What is your favorite movie?
What's your favorite memory?`;

const thought = `What might your younger self think of our relationship?
Have your friendships ever taught you anything about romantic relationships?
Has our relationship taught you anything about yourself that you didn't know before?
What have I taught you?
What excites you the most about life?
How essential is 'physical connection' to you?
What do you think constitutes a healthy and happy relationship?
What did you learn from your parents' relationship?
What do you think defines emotional intimacy?
What do you feel when you take a trip down memory lane?
What's on your bucket list?
What's the best gift I've ever given you?
Do you know how to tell when I'm angry? And how do you respond?
What is something you want to try but have always been too afraid to?
What do I do that turns you on the most?
Do you think we trust each other and show that we trust one another?
What do you consider cheating?
What is your friendship like with your best friend?
How do you think your friends might describe you?
What do you think the best way to express love is?`;

const heavy = `When did you last cry, and why?
When was the last time you laughed and genuinely felt happy?
Are you satisfied with your life outside of us as a couple?
Are you satisfied with your life in this relationship?
What is your worst memory?
Is there anything you need to forgive yourself for?
What is something that makes you feel alive?
What has excited you lately?
How would you describe your childhood?
What do you fear most about our relationship?
When you think of our future, what do you think of?
What makes you sad?
If you could change one thing about us as a couple, what would it be?
How do you need or want to be shown love, and do I, as a partner, show you I love you enough?
How often do you reflect on the past?
Are you satisfied with our sex life?
What keeps you up at night?
Do you feel appreciated?
What is your biggest regret?
What is the most challenging part of our relationship right now?`;

function parse(questions, category) {
    return questions.split('\n').map((str) => ({
        prompt: str,
        category,
    }));
}

window._questions = [
    ...parse(iceBreakers, 'Ice Breakers'),
    ...parse(thought, 'Thought-Provoking'),
    ...parse(heavy, 'Emotional Heavy-Hitters'),
];