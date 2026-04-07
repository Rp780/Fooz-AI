import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, AsyncMock
from backend.main import app

client = TestClient(app)


def test_health_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "fooz is alive"}


def test_get_memory_returns_messages():
    with patch("backend.main.memory.get_history", new_callable=AsyncMock) as mock:
        mock.return_value = [{"role": "user", "content": "hi"}]
        response = client.get("/memory")
        assert response.status_code == 200
        assert response.json() == {"messages": [{"role": "user", "content": "hi"}]}


def test_delete_memory_returns_ok():
    with patch("backend.main.memory.clear_history", new_callable=AsyncMock) as mock:
        mock.return_value = None
        response = client.delete("/memory")
        assert response.status_code == 200
        assert response.json() == {"status": "memory cleared"}
