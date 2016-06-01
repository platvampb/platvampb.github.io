wheregoHomeApp.directive('surveyQuestionOuter', ['$compile', function($compile) {
	var linker = function(scope, element, attrs) {
		element.html('<survey-question display-type=\'' + scope.content.displayType + '\'></survey-question>').show();
		scope.selected = undefined;
		scope.inputId = "question" + scope.content.id;
		scope.userAnswer = scope.$parent.user.answers[scope.content.id];
		scope.theForm = scope.$parent.inviteForm;
		$compile(element.contents())(scope);
	};

	return {
		restrict: "E",
		link: linker,
		scope: {
			content:'=',
			index:'='
		},
		transclude: true
	};
}]);

wheregoHomeApp.directive('surveyQuestion', ['$compile', function($compile) {
	return {
		templateUrl: function(elem, attrs){
			return 'pages/component_templates/question-' + attrs.displayType.toLowerCase() + '.html';
			//return 'pages/component_templates/question-text.html';
		}
	};
}]);

wheregoHomeApp.directive('initSelectPicker', ['$timeout', function($timeout) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			if (scope.$last === true) {
				$timeout(function () {
					scope.$emit('optionsLoaded', { question: scope.content, inputId: scope.inputId });
				});
			}
		}
	};
}]);
