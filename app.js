var myModule = angular.module('todoMVC', []);

myModule.controller('TodoMVCController', function($scope) {
    $scope.todos = {
      edited: null,
      listViewType: 'all',
      newText: '',
      checkAll: false,
      list: [],
      left: function() {
          return this.list.reduce(function(x,t) { return x + Number(!t.done) }, 0);
        },
      save: function() {
          if (this.newText) {
            this.list.push({'done': false, 'text': $scope.todos.newText});
            this.newText = '';
            this.updateCheckStatus();
          }
        },
      remove: function(item) {
          this.list.splice(this.list.indexOf(item), 1);
        },
      filterList: function(value, index, array) {
          var view = $scope.todos.listViewType;
          return (view == 'all' || (view =='done' && value.done || view == 'active' && !value.done));
        },
      removeCompleted: function() {
          this.list = this.list.filter(function(x) {return x.done == false;});
        },
      setListDone: function(){
          var self = this;
          this.list.map(function(x) {
            x.done = self.checkAll;
          });
        },
      updateCheckStatus: function(){
          this.checkAll = !this.list.some(function(x) {return !x.done;});
        }
      };
  }
);
