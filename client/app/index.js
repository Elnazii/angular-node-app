import angular from 'angular';
import * as router from '@uirouter/angularjs';

const module = angular.module('elnazApp', ['ui.router']);

require('./components/user-login').default(module);
require('./components/navigation').default(module);
require('./components/user-list').default(module);
require('./components/user-add').default(module);
require('./components/footer').default(module);

require('./router').default(module);

angular.bootstrap(document, ['elnazApp']);