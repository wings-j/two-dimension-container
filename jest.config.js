export default {
  testRegex: '(.+)\\.test\\.(js|ts)$',
  transform: {
    '\\.(js|ts)$': 'babel-jest'
  },
  moduleFileExtensions: ['ts', 'js']
}
