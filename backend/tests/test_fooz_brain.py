from backend.fooz_brain import build_messages, SYSTEM_PROMPT


def test_build_messages_with_empty_history():
    result = build_messages("hello", [])
    assert result == [{"role": "user", "content": "hello"}]


def test_build_messages_appends_to_history():
    history = [
        {"role": "user", "content": "hey"},
        {"role": "assistant", "content": "sup"},
    ]
    result = build_messages("how are you", history)
    assert len(result) == 3
    assert result[-1] == {"role": "user", "content": "how are you"}
    assert result[0] == {"role": "user", "content": "hey"}


def test_system_prompt_defines_fooz_identity():
    assert "Fooz" in SYSTEM_PROMPT
    assert len(SYSTEM_PROMPT) > 100
