$(function () {
  var vocabularyList = [];
  var definitionList = [];
  var userVerbsList = [];
  var verbsList = [];
  var userNounsList = [];
  var nounsList = [];
  var text = "";
  // Check if device is a mobile device
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  var vocabulary = [
    {
      name: "ecosystem",
      type: "n",
      definition:
        "all the living things, in an area and the effect they have on each other and the environment",
    },
    {
      name: "climate",
      type: "n",
      definition:
        "the general weather conditions usually found in a particular place",
    },
    {
      name: "threaten",
      type: "v",
      definition: "to be likely to damage or harm something",
    },
    {
      name: "fossil fuel",
      type: "n",
      definition:
        "a source of energy like coal, gas, and petroleum, that was formed inside the Earth millions of years ago",
    },
    {
      name: "greenhouse gas",
      type: "n",
      definition: "a gas that makes the air around the Earth warmer",
    },
    {
      name: "atmosphere",
      type: "n",
      definition: "the layer around the Earth",
    },
    {
      name: "global warming",
      type: "n",
      definition: "an increase in the Earth's temperature because of pollution",
    },
    {
      name: "cause",
      type: "n",
      definition: "someone or something that makes something happen",
    },
    {
      name: "absorb",
      type: "v",
      definition: "to take in a liquid or gas through a surface and hold it",
    },
    {
      name: "construction",
      type: "n",
      definition:
        "the process of building something, usually large structures such as houses, roads, or bridges",
    },
    {
      name: "destruction",
      type: "n",
      definition:
        "the act of causing so much damage to something that it stops existing because it cannot be repaired",
    },
    {
      name: "effect",
      type: "n",
      definition: "result; a change that happens because of a cause",
    },
    {
      name: "farming",
      type: "n",
      definition: "the job of working on a farm or organizing work on a farm",
    },
    {
      name: "logging",
      type: "n",
      definition: "the activity or business of cutting down trees for wood",
    },
    {
      name: "rainforest",
      type: "n",
      definition: "a foreset in a tropical area that gets a lot of rain",
    },
    {
      name: "annual",
      type: "adj",
      definition: "occurring once every year",
    },
    {
      name: "area",
      type: "n",
      definition: "a particular part of a place, piece of land, or country",
    },
    {
      name: "challenge",
      type: "n",
      definition:
        "something that needs great mental or physical effort in order to be done successfully and therefore tests a person's ability",
    },
    {
      name: "consequence",
      type: "n",
      definition:
        "a result of a particular action or situation, often one that is bad or not convenient",
    },
    {
      name: "contribute to",
      type: "v",
      definition:
        "to give or supply (something, such as money or time) as a part or share",
    },
    {
      name: "issue",
      type: "n",
      definition: "a vital or unsettled matter concern, problem",
    },
    {
      name: "predict",
      type: "v",
      definition:
        "say or estimate that (a specified thing) will happen in the future or will be a consequence of something",
    },
    {
      name: "trend",
      type: "n",
      definition:
        "a general direction in which something is developing or changing",
    },
  ];
  function randomWords(words, number) {
    const shuffledWords = [...words]; // Make a copy of the input array
    for (let i = shuffledWords.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [shuffledWords[i], shuffledWords[j]] = [
        shuffledWords[j],
        shuffledWords[i],
      ];
    }
    return shuffledWords.slice(0, number);
  }

  function getRandomWordsWithN_V_Adj(words) {
    const types = ["n", "v"];

    // filter words to only include the desired types
    const filteredWords = words.filter((word) => types.includes(word.type));

    // group and shuffle the remaining words by type
    const groupedWords = filteredWords.reduce((groups, word) => {
      const type = word.type;
      if (!groups[type]) {
        groups[type] = [];
      }
      groups[type].push(word);
      return groups;
    }, {});

    const shuffledWords = Object.keys(groupedWords).reduce((shuffled, type) => {
      shuffled[type] = shuffle(groupedWords[type]);
      return shuffled;
    }, {});

    // select 6 random words of each type and map them to objects
    const randomWords = types.flatMap((type) => {
      return shuffledWords[type].slice(0, 6).map((word) => ({
        name: word.name,
        type: word.type,
      }));
    });

    return randomWords;
  }

  // shuffle function (for shuffling the words within each group)
  function shuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  function dispplayVocabulary_1(list_1) {
    var names = list_1.map((word) => word.name);
    text = "";
    names.forEach(connect_word_name);
    return $("#list_1").html(text);
  }
  function connect_word_name(item) {
    text += `<span class="me-3">${item.trim().replace(" ", "&nbsp;")}</span>`+ "";
  }
  function displayVocabulary(vocabulary) {
    vocabularyList = randomWords(vocabulary, 10);
    let vocaText = "<ol>";
    vocabularyList.forEach((word, index) => {
      vocaText += `<li>${
        word.name
      } <input  type="text"  maxlength="1" size="2" class="answer" id="answer_${
        index + 1
      }" /></li>`;
    });
    vocaText += "</ol>";
    document.getElementById("vocabulary").innerHTML = vocaText;
  }

  function displaydefinition(vocabulary) {
    definitionList = randomWords(vocabulary, 10);
    let vocaText = "<ol type='a'>";
    definitionList.forEach((word) => {
      vocaText += `<li>${word.definition}</li>`;
    });
    vocaText += "</ol>";
    document.getElementById("definition").innerHTML = vocaText;
  }

  function getLetter(word) {
    var definition = "";
    $.each(definitionList, function (index, item) {
      if (item.name === word) {
        definition = index + 1;
        return false;
      }
    });
    return String.fromCharCode(definition + 96);
  }

  function filterVocabularyByType(vocabularyList) {
    for (let i = 0; i < vocabularyList.length; i++) {
      const vocabulary = vocabularyList[i];
      if (vocabulary.type === "n") {
        nounsList.push(vocabulary.name);
      } else if (vocabulary.type === "v") {
        verbsList.push(vocabulary.name);
      }
    }
  }
  function compareLists(userList, referenceList, type) {
    var source = 0;
    const matchingItems = [];
    var nonMatchingItems = [];

    userList.forEach((item) => {
      if (
        type === "noun" &&
        referenceList.includes(item) &&
        nounsList.includes(item)
      ) {
        matchingItems.push(item);
        source++;
      } else if (
        type === "verb" &&
        referenceList.includes(item) &&
        verbsList.includes(item)
      ) {
        matchingItems.push(item);
        source++;
      }
    });
    nonMatchingItems = referenceList.filter((item) => !userList.includes(item));

    return { matching: matchingItems, notMatching: nonMatchingItems, source };
  }

  function getSource_displayAnwser(user, original, type) {
    const comparison = compareLists(user, original, type);
    var matching = comparison.matching ? comparison.matching.join(", ") : "";
    var notMatching = comparison.notMatching
      ? comparison.notMatching.join(", ")
      : "";
    $(`#${type}s_anwser`).html(`${matching}`);
    $(`#${type}s_anwser`).append(
      `<br><span class="fw-b text-danger"> ${notMatching}</span>`
    );
    return comparison.source;
  }

  function processEmptyAnswer(emptyAnswer) {
    var names = emptyAnswer.map((word) => word.name);
    var emptyAnswerString = names.join(", ");
    $(`#answer_${emptyAnswer[0].index + 1}`).trigger("focus");
    $("#message").addClass("alert-warning");
    $("#message").removeClass("d-none");
    $("#message").html(
      `Please find the answer of <b>${emptyAnswerString}</b>.`
    );
  }
  var randomVocabulary = randomWords(vocabulary, 10);
  var randomWordsWithN_V_Adj = getRandomWordsWithN_V_Adj(vocabulary, 15);
  console.log(randomWordsWithN_V_Adj);
  var list_1 = randomWords(randomWordsWithN_V_Adj);

  displaydefinition(randomVocabulary);
  displayVocabulary(randomVocabulary);
  dispplayVocabulary_1(list_1);

  function addFireworks() {
    const container = document.querySelector(".fireworks");
    const fireworks = new Fireworks.default(container, {
      autoresize: true,
      opacity: 0.5,
      sound: {
        enabled: true,
        files: [
          "sounds/explosion0.mp3",
          "sounds/explosion1.mp3",
          "sounds/explosion2.mp3",
        ],
        volume: {
          min: 4,
          max: 8,
        },
      },
    });
    fireworks.start();
    setTimeout(() => {
      fireworks.stop();
    }, 3000);
  }

  $("#check").on("click", function () {
    var source = 0;
    var incorrectVocabulary = [];
    var emptyAnswer = [];
    $("input.answer").each(function (index) {
      var vocaName = vocabularyList[index].name;
      var userAnswer = $(this).val().toLowerCase();
      if (userAnswer == "") {
        emptyAnswer.push({ name: vocaName, index: index });
      } else {
        const indexFromVocabulary =
          userAnswer.charCodeAt(0) - "a".charCodeAt(0);
        const definition = definitionList[indexFromVocabulary].name;
        if (vocaName == definition) {
          source++;
        } else {
          incorrectVocabulary.push({ name: vocaName, index: index });
        }
      }
    });
    if (emptyAnswer.length > 1) {
      processEmptyAnswer(emptyAnswer);
    } else {
      incorrectVocabulary.map((word) => {
        $(`#answer_${word.index + 1}`).val(getLetter(word.name));
        $(`#answer_${word.index + 1}`).addClass("text-danger fw-bold");
      });
      var names = incorrectVocabulary.map((word) => word.name);
      var errorString = names.join(", ");
      if ($("#message").hasClass("alert-warning")) {
        $("#message").removeClass("alert-warning");
      }
      if (source < 10) {
        $("#message ").html(
          `You are correct ${source}/10. You should learn the definition of <strong>${errorString}</strong> again.`
        );
      } else {
        $("#message").html(
          `Great job! You got a perfect 15 out of 15! You're so smart because you have learned from an awesome, beautiful, capable, dedicated, enthusiastic, helpful, superb, intelligent, graceful, and gorgeous ESL professor. 🎉👍`
        );
      }
      $(this).addClass("d-none");
      $("#message").removeClass("d-none");
      $("#new").removeClass("d-none");
    }
  });

  $("#new").on("click", function () {
    randomVocabulary = randomWords(vocabulary, 10);
    displaydefinition(randomVocabulary);
    displayVocabulary(randomVocabulary);
    $(this).addClass("d-none");
    $("#message").addClass("d-none");
    $("#check").removeClass("d-none");
  });

  // onclick function for Part 1
  $("#check_part_1").on("click", function () {
    var totalSource = 0;
    var nouns_string = $("#nouns").val();
    userNounsList = nouns_string.split(", ").map(function (item) {
      return item.toLowerCase().trim();
    });
    var verbs_string = $("#verbs").val();
    userVerbsList = verbs_string.split(", ").map(function (item) {
      return item.toLowerCase().trim();
    });
    filterVocabularyByType(randomWordsWithN_V_Adj);
    totalSource += getSource_displayAnwser(userNounsList, nounsList, "noun");
    totalSource += getSource_displayAnwser(userVerbsList, verbsList, "verb");
    $("textarea, #check_part_1").addClass("d-none");
    $("textarea").val("");
    $("#nouns_anwser, #verbs_anwser").removeClass("d-none");
    if (totalSource < 15) {
      $("#message_part_1").html(`You are correct ${totalSource}/15.`);
    } else {
      addFireworks();
      $("#message_part_1").html(
        "Great job! You got a perfect 15 out of 15! You're so smart because you have learned of them by an awesome, beautiful, capable, dedicated, enthusiastic, helpful, generous, intelligent, outgoing, and positive  ESL professor. 🎉👍"
      );
    }
    $("#message_part_1, #new_part_1").removeClass("d-none");
  });
  $("#new_part_1").on("click", function () {
    verbsList = [];
    userNounsList = [];
    nounsList = [];
    randomWordsWithN_V_Adj = getRandomWordsWithN_V_Adj(vocabulary, 15);
    list_1 = randomWords(randomWordsWithN_V_Adj);
    dispplayVocabulary_1(list_1);
    $("#nouns_anwser, #verbs_anwser, #new_part_1").addClass("d-none");
    $("#nouns_anwser, #verbs_anwser").html("");
    $("#message_part_1").addClass("d-none");
    $("#check_part_1, textarea").removeClass("d-none");
  });
  if (isMobile) {
    // Add click event listener to scroll to top button if on mobile device
    $("#check_part_1").on("click", function () {
      $("html, body").animate({ scrollTop: 150 }, 500);
      return false;
    });
  }
});
