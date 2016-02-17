$(document).ready(function() {
  generate();

  function generate() {
    var quotes = ["Success is simple. Do what's right, the right way, at the right time.@-Arnold H. Glasow","Mountains are earth's undecaying monuments.@-Nathaniel Hawthorne","Life is 10 percent what you make it, and 90 percent how you take it.@-Irving Berlin","People happy in love have an air of intensity.@-Stendhal","Always remember that you are absolutely unique. Just like everyone else.@-Unknown", "Because it's there- (on climbing mountains)@-George Mallory","Society is like a stew. If you don't stir it up every once in a while then a layer of scum floats to the top.@-Edward Abbey" ,"Footsteps always follow us, whenever it is snowing.  They always show us where we've been, but never where we're going.@-Winnie the Pooh's A-Z","Do not take life too seriously. You will never get out of it alive.@-Elbert Hubbard", "Small minds discuss people.  Average minds discuss events.  Great minds discuss ideas.@-Unknown","It's amazing that the amount of news that happens in the world every day always just exactly fits the newspaper.@-Jerry Seinfeld","Prejudice is a great time saver. You can form opinions without having to get the facts.@-E. B. White","If you cannot get rid of the family skeleton, you may as well make it dance.@-George Bernard Shaw","When we talk to God, we're praying. When God talks to us, we're schizophrenic.@-Jane Wagner","I have decided to make my life my argument.@-Albert Schweitzer","Originality is the fine art of remembering what you hear but forgetting where you heard it.@-Laurence J. Peter", "Do not go gentle into that good night.  Rage, rage against the dying of the light.@-Dylan Thomas","Get your facts first, then you can distort them as you please.@-Mark Twain","I have had a perfectly wonderful evening, but this wasn't it.@-Groucho Marx","My grandmother started walking five miles a day when she was sixty. She's ninety-seven now, and we don't know where the hell she is.@-Ellen DeGeneres","We are all here on earth to help others; what on earth the others are here for I don't know.@-W. H. Auden"];

    randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteAuthor = randomQuote.split("@");
    $('.saying').text(quoteAuthor[0]);
    $('.author').text(quoteAuthor[1]);
  }

  $(".button").on("click", function() {
    generate();
  });

});