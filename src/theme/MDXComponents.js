import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Steps, Step} from '@site/src/components/Steps';
import {Card, CardGroup} from '@site/src/components/Cards';
import PageActions from '@site/src/components/PageActions';

export default {
  ...MDXComponents,
  Tabs,
  TabItem,
  Steps,
  Step,
  Card,
  CardGroup,
  Columns: CardGroup,
  PageActions,
};
