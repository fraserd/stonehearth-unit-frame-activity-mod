 $(document).ready(function() {
     $(top).on("radiant_selection_changed.unit_frame", function unitActivityFrameOnSelectChangedHandler(_, data) {
         if (!App.gameView) {
             return;
         }

         var unitActivityFrame = App.gameView.getView(App.StonehearthUnitFrameActivityView);
         if (!unitActivityFrame) {
             var view = App.gameView.addView(App.StonehearthUnitFrameActivityView, { uri: data.selected_entity });
         } else {
             unitActivityFrame.set('uri', data.selected_entity);
         }
     });
 });

 App.StonehearthUnitFrameActivityView = App.View.extend({
     templateName: 'unitFrameActivity',
     uriProperty: 'model',
     components: {
         "stonehearth:ai": {
             "status_text_data": {}
         },
     },

     _updateActivity: function() {
         var self = this;
         var status_key = self.get('model.stonehearth:ai.status_text_key');
         if (status_key) {
             var status = i18n.t(status_key, { data: self.get('model.stonehearth:ai.status_text_data') });
         }
     }.observes('model'),

     init: function() {
         this._super();
         var self = this;
     },

     _updateVisibility: function() {
         var self = this;
         var selectedEntity = this.get('uri');
         if (App.getGameMode() == 'normal' && selectedEntity) {
             this.set('visible', true);
         } else {
             this.set('visible', false);
         }
     },

     supressSelection: function(supress) {},

     didInsertElement: function() {},

     willDestroyElement: function() {},

     commands: function() {},

     actions: {}
 });