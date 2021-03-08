const scale1 = [
  { value: 0, label: 'not at all' },
  { value: 1, label: 'several days' },
  { value: 2, label: 'more than half the days' },
  { value: 3, label: 'nearly every day' },
];

const GAD7 = {
  id: 2,
  abbr: 'GAD-7',
  name: 'Generalized Anxiety Disorder 7',
  description:
    'The Generalised Anxiety Disorder Assessment (GAD-7) is a seven-item instrument that is used to measure or assess the severity of generalised anxiety disorder (GAD). Each item asks the individual to rate the severity of his or her symptoms over the past two weeks. Response options include "not at all", "several days", "more than half the days" and "nearly every day".',
  link: 'https://www.phqscreeners.com/',
  instructions:
    'This questionnaire is an important part of providing you with the best health care possible. Your answers will help in understanding problems that you may have. Please answer every question to the best of your ability unless you are requested to skip over a question.',
  audience:
    'The GAD-7 has been validated for primary care patients, general population, and adolescents with GAD',
  selfAdmin: true,
  minMinutes: 1,
  maxMinutes: 2,
  attribution:
    'Developed by Drs. Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke and colleagues, with an educational grant from Pfizer Inc. No permission required to reproduce, translate, display or distribute.',
  thankYou: 'Thank you for completing the GAD-7.',
  sections: [
    {
      id: 1,
      instructions:
        'Over the last 2 weeks, how often have you been bothered by the following problems?',
      scale: scale1,
      questions: [
        {
          id: 1,
          type: 'radio',
          stem: 'Feeling nervous, anxious or on edge',
          scale: scale1,
        },
        {
          id: 2,
          type: 'radio',
          stem: 'Not being able to stop or control worrying',
          scale: scale1,
        },
        {
          id: 3,
          type: 'radio',
          stem: 'Worrying too much about different things',
          scale: scale1,
        },
        {
          id: 4,
          type: 'radio',
          stem: 'Trouble relaxing',
          scale: scale1,
        },
        {
          id: 5,
          type: 'radio',
          stem: 'Being so restless that it is hard to sit still',
          scale: scale1,
        },
        {
          id: 6,
          type: 'radio',
          stem: 'Becoming easily annoyed or irritable',
          scale: scale1,
        },
        {
          id: 7,
          type: 'radio',
          stem: 'Feeling afraid as if something awful might happen ',
          scale: scale1,
          pagebreak: true,
        },
      ],
    },
  ],
};

export default GAD7;
