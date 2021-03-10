const scale1 = [
  { value: 0, label: 'Not at all' },
  { value: 1, label: 'Several days' },
  { value: 2, label: 'More than half the days' },
  { value: 3, label: 'Nearly every day' },
];

const scale2 = [
  { value: 0, label: 'Not difficult at all' },
  { value: 1, label: 'Somewhat difficult' },
  { value: 2, label: 'Very Difficult' },
  { value: 3, label: 'Extremely Difficult' },
];

const GAD7 = {
  id: 2,
  abbr: 'GAD-7',
  code: 'GAD7',
  name: 'Generalized Anxiety Disorder-7',
  description:
    'The Generalized Anxiety Disorder Assessment (GAD-7) is a seven-item instrument that is used to measure or assess the severity of generalised anxiety disorder (GAD). Each item asks the individual to rate the severity of his or her symptoms over the past two weeks. Response options include "not at all", "several days", "more than half the days" and "nearly every day".',
  link: 'https://www.phqscreeners.com/',
  instructions:
    'This questionnaire is an important part of providing you with the best health care possible. Your answers will help in understanding problems that you may have. Please answer every question to the best of your ability unless you are requested to skip over a question.',
  audience:
    'The GAD-7 has been validated for primary care patients, general population, and adolescents with GAD',
  score:
    'This is calculated by assigning scores of 0, 1, 2, and 3 to the response categories, respectively, of “not at all,” “several days,” “more than half the days,” and “nearly every day.” GAD-7 total score for the seven items ranges from 0 to 21.',
  interpretation:
    '0–4: minimal anxiety, 5–9: mild anxiety, 10–14: moderate anxiety, 15–21: severe anxiety ',
  selfAdmin: true,
  minMinutes: 1,
  maxMinutes: 2,
  attribution:
    'Developed by Drs. Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke and colleagues, with an educational grant from Pfizer Inc. No permission required to reproduce, translate, display or distribute.',
  thankYou: 'Thank you for completing the GAD-7.',
  chartData: {
    labels: (tests) => {
      const dates = [];
      tests.forEach((test) => dates.push(test.timeSent));
      return dates;
    },
    dataPoints: (tests) => {
      const points = [];
      tests.forEach((test) => {
        const res = JSON.parse(test.res);
        console.log('res here!', res);
        const sumRes =
          Number(res.s1q1) +
          Number(res.s1q2) +
          Number(res.s1q3) +
          Number(res.s1q4) +
          Number(res.s1q5) +
          Number(res.s1q6) +
          Number(res.s1q7);
        points.push(sumRes);
      });
      console.log('points here!', points);
      return points;
    },
  },
  sections: [
    {
      id: 1,
      instructions:
        'Over the last 2 weeks, how often have you been bothered by the following problems?',
      scale: scale1,
      questions: [
        {
          id: 's1q1',
          type: 'Radio',
          stem: 'Feeling nervous, anxious or on edge',
          scale: scale1,
        },
        {
          id: 's1q2',
          type: 'Radio',
          stem: 'Not being able to stop or control worrying',
          scale: scale1,
        },
        {
          id: 's1q3',
          type: 'Radio',
          stem: 'Worrying too much about different things',
          scale: scale1,
        },
        {
          id: 's1q4',
          type: 'Radio',
          stem: 'Trouble relaxing',
          scale: scale1,
        },
        {
          id: 's1q5',
          type: 'Radio',
          stem: 'Being so restless that it is hard to sit still',
          scale: scale1,
        },
        {
          id: 's1q6',
          type: 'Radio',
          stem: 'Becoming easily annoyed or irritable',
          scale: scale1,
        },
        {
          id: 's1q7',
          type: 'Radio',
          stem: 'Feeling afraid as if something awful might happen',
          scale: scale1,
          pagebreak: true,
        },
      ],
    },
    {
      id: 2,
      instructions:
        'If you checked off any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?',
      scale: scale2,
      questions: [
        {
          id: 's2q1',
          type: 'Radio',
          stem: 'Please select the most accurate respose',
          scale: scale2,
        },
      ],
    },
  ],
};

export default GAD7;
