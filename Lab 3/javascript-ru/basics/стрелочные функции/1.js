function ask(question, yes, no) {
    if (confirm(question)) yes()
    else no();
  }
  
  ask(
    "R u agree?",
    () => alert("You confirmed"),
    () => alert("You cancelled")
  );