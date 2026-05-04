// Tech stack assets module - consolidates all tech stack icons
import AWSLight from './AWS-Light.svg';
import CS from './CS.svg';
import CSS from './CSS.svg';
import DartLight from './Dart-Light.svg';
import Docker from './Docker.svg';
import GithubLight from './Github-Light.svg';
import GraphQLLight from './GraphQL-Light.svg';
import HTML from './HTML.svg';
import MongoDB from './MongoDB.svg';
import NotionLight from './Notion-Light.svg';
import Postman from './Postman.svg';
import RedisLight from './Redis-Light.svg';
import StackOverflowLight from './StackOverflow-Light.svg';
import TensorFlowLight from './TensorFlow-Light.svg';

export const techStackIcons = {
  AWSLight,
  CS,
  CSS,
  DartLight,
  Docker,
  GithubLight,
  GraphQLLight,
  HTML,
  MongoDB,
  NotionLight,
  Postman,
  RedisLight,
  StackOverflowLight,
  TensorFlowLight,
};

// Export as array for easier iteration if needed
export const techStackArray = Object.entries(techStackIcons).map(([name, icon]) => ({
  name,
  icon,
}));

export default techStackIcons;
