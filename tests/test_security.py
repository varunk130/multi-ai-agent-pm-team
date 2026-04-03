"""
Tests for security utilities — PII detection, sanitization, synthetic validation.

All data is 100% synthetic. Built by Varun Kulkarni.
"""

from __future__ import annotations

import pytest

from pipeline.utils.security import (
    SecurityConfig,
    sanitize_output,
    validate_no_pii,
    validate_synthetic_data,
)


class TestValidateNoPII:
    def test_clean_text(self):
        violations = validate_no_pii("This is a clean synthetic description with no PII.")
        assert violations == []

    def test_detects_email(self):
        violations = validate_no_pii("Contact john.doe@realcompany.com for details.")
        assert any("email" in v.lower() for v in violations)

    def test_ignores_allowed_domains(self):
        violations = validate_no_pii("Email test@example.com for info.")
        assert violations == []

    def test_detects_phone(self):
        violations = validate_no_pii("Call 555-123-4567 for support.")
        assert any("phone" in v.lower() for v in violations)

    def test_detects_ssn(self):
        violations = validate_no_pii("SSN: 123-45-6789")
        assert any("ssn" in v.lower() for v in violations)

    def test_detects_api_key(self):
        violations = validate_no_pii("Key: sk-abcdefghijklmnopqrstuvwxyz1234")
        assert any("api key" in v.lower() or "key" in v.lower() for v in violations)

    def test_custom_config(self):
        config = SecurityConfig(check_phone=False)
        violations = validate_no_pii("Call 555-123-4567", config=config)
        assert not any("phone" in v.lower() for v in violations)


class TestSanitizeOutput:
    def test_redacts_email(self):
        result = sanitize_output("Contact admin@corp.com for help.")
        assert "[EMAIL REDACTED]" in result
        assert "admin@corp.com" not in result

    def test_redacts_phone(self):
        result = sanitize_output("Phone: 555-867-5309")
        assert "[PHONE REDACTED]" in result

    def test_redacts_ssn(self):
        result = sanitize_output("SSN: 123-45-6789 is sensitive")
        assert "[SSN REDACTED]" in result

    def test_clean_text_unchanged(self):
        text = "This is clean synthetic text with no sensitive data."
        assert sanitize_output(text) == text


class TestValidateSyntheticData:
    def test_known_synthetic_passes(self):
        data = [
            {"id": "T-1", "customer": "Acme Corp", "title": "Test"},
            {"id": "T-2", "customer": "TechNova Inc", "title": "Test"},
            {"id": "T-3", "customer": "GlobalTrade LLC", "title": "Test"},
        ]
        warnings = validate_synthetic_data(data)
        assert len(warnings) == 0

    def test_unknown_companies_flag(self):
        data = [
            {"id": "T-1", "customer": "Unknown Real Corp", "title": "Something"},
            {"id": "T-2", "customer": "Another Real Corp", "title": "Something"},
        ]
        warnings = validate_synthetic_data(data)
        assert len(warnings) > 0

    def test_pii_in_data_flagged(self):
        data = [
            {"id": "T-1", "customer": "TestCo", "title": "Contact john@real.com"},
        ]
        warnings = validate_synthetic_data(data)
        assert any("PII" in w for w in warnings)

    def test_empty_data(self):
        warnings = validate_synthetic_data([])
        assert warnings == []
