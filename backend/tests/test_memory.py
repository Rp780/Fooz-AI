from backend.memory import trim_messages


def test_trim_messages_keeps_last_40_when_over_limit():
    messages = [{"role": "user", "content": f"msg {i}"} for i in range(50)]
    result = trim_messages(messages)
    assert len(result) == 40
    assert result[0]["content"] == "msg 10"


def test_trim_messages_unchanged_when_under_limit():
    messages = [{"role": "user", "content": f"msg {i}"} for i in range(20)]
    result = trim_messages(messages)
    assert len(result) == 20


def test_trim_messages_empty_list():
    result = trim_messages([])
    assert result == []
