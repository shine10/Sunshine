var noteApp = {
  currentNote: {},
  init: function(){
    $('.add').on('click', this.addNote);
    $('.note-list').on('click', '.remove', this.removeNote);
    $('.note-list').on('keyup click', this.saveNote);

    this.loadNotes();
  },
  loadNotes: function(){
    var notes = JSON.parse(localStorage.getItem('notes'));
    var DOM = '';
    $.each(notes, function(index, el) {
      DOM += noteApp.noteDom(notes[index]);
    });
    $('.note-list').append(DOM);
  },
  addNote: function(){
    $('.save').click();
    var DOM = noteApp.noteDom('Enter a text here');
    $('.note-list').append(DOM);
    $('li').last().children('.content').focus();
    document.execCommand('selectAll',false,null);
  },
  saveNote: function(event){
    noteApp.storeNotes();
  },
  removeNote: function(event){
    $(event.target).parents('li').remove();
    noteApp.storeNotes();
  },
  storeNotes: function(){
    var notes = {};
    $('.note').each(function(index, el) {
      notes[index] = $(el).children(".content").html();
    });
    localStorage.setItem('notes', JSON.stringify(notes));
  },
  noteDom: function(content){
    return '<li class="note"><p contenteditable="true" class="content">' + '</p><button class="remove"><i class="fa fa-trash-o"></i></button></li>';
  }
};

noteApp.init();