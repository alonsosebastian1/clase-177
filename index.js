
$(document).ready(function(){
    getStory();
})
$(function(){
    $("#submit_story").click(function(){
        var values = []
        for (var i = 0; i < $(".input_field").length; i++){
            values.push($(".input_field").eq(i).val())
        }
        var data = {
            "story_id" : $("#story_id").val(),
            "values":values
        }
        $.ajax({
            url:"/post-answers",
            type:"post",
            data:JSON.stringify(data),
            dataType:"json",
            contentType:"application/json",
            success:function(result){
                $("#result").html(result.result)
                $("#result_container").removeClass("hidden")
            },
            error:function(result){
                alert(result.responseJSON.message)
            }
        })
    })
})
function getStory(){
    $.ajax({
        url:"/get-story",
        type:"get",
        success:function(result){
            displayStory(result.story)
        },
        error:function(result){
            alert(result.responseJSON.message)
        }
    })
}
function displayStory(story){
    
    $("#story_title").html(story.title)
    $("#bank_words").empty();
    for(var i = 0; i < story.words.length; i++){
        var html = `<button class = "word_bank_button" > ${story.words[i]}</button>`
        $("#bank_words").append(html)
    }
    
    $("#input_fields").empty();
    for(var i = 0; i<story.inputs; i++){
        var input_html = `<input type = "text" class="input_field" id="input_${i}" placeholder = "entrada${i+1}" />`
        $("#input_fields").append(input_html)
    }
    $("#story_text").html(story.story)
    $("#story_id").html(story.story_id)
    $(".input_field").keyup(function(){
        var id = $(this).attr("id");
        var input_number = id.split("_")[1]
        $(".rep_input").eq(input_number).html($(this).val())
    })
}
