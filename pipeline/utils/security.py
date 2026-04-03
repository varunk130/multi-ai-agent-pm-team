"""
Security utilities for the Multi AI Agent PM Team pipeline.

Provides validation and sanitization functions to ensure no PII or
sensitive data leaks into pipeline outputs. All data processed by this
pipeline is synthetic; these checks are defense-in-depth.

Built by Varun Kulkarni.
"""

from __future__ import annotations

import re
from typing import Any

from pydantic import BaseModel, Field


# ---- Patterns ----

EMAIL_PATTERN = re.compile(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}")
PHONE_PATTERN = re.compile(
    r"(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}"
)
SSN_PATTERN = re.compile(r"\b\d{3}-\d{2}-\d{4}\b")
CREDIT_CARD_PATTERN = re.compile(r"\b(?:\d{4}[-\s]?){3}\d{4}\b")
IP_ADDRESS_PATTERN = re.compile(
    r"\b(?:\d{1,3}\.){3}\d{1,3}\b"
)
API_KEY_PATTERN = re.compile(
    r"(?:sk-[a-zA-Z0-9]{20,}|AKIA[A-Z0-9]{16}|ghp_[a-zA-Z0-9]{36})"
)

SENSITIVE_PATTERNS = {
    "email": EMAIL_PATTERN,
    "phone": PHONE_PATTERN,
    "ssn": SSN_PATTERN,
    "credit_card": CREDIT_CARD_PATTERN,
    "api_key": API_KEY_PATTERN,
}


class SecurityConfig(BaseModel):
    """Configuration for security checks."""

    check_email: bool = True
    check_phone: bool = True
    check_ssn: bool = True
    check_credit_card: bool = True
    check_api_key: bool = True
    allowed_domains: list[str] = Field(
        default_factory=lambda: ["example.com", "test.com", "synthetic.local"]
    )
    max_text_length: int = 50_000


def validate_no_pii(text: str, config: SecurityConfig | None = None) -> list[str]:
    """
    Check text for PII patterns. Returns a list of violation descriptions.

    An empty list means no PII was detected.
    """
    cfg = config or SecurityConfig()
    violations: list[str] = []

    if cfg.check_email:
        emails = EMAIL_PATTERN.findall(text)
        # Filter out allowed domains
        real_emails = [
            e for e in emails
            if not any(e.endswith(f"@{d}") for d in cfg.allowed_domains)
        ]
        if real_emails:
            violations.append(
                f"Possible email addresses detected: {', '.join(real_emails[:3])}"
            )

    if cfg.check_phone and PHONE_PATTERN.search(text):
        violations.append("Possible phone number pattern detected")

    if cfg.check_ssn and SSN_PATTERN.search(text):
        violations.append("Possible SSN pattern detected")

    if cfg.check_credit_card and CREDIT_CARD_PATTERN.search(text):
        violations.append("Possible credit card number detected")

    if cfg.check_api_key and API_KEY_PATTERN.search(text):
        violations.append("Possible API key or secret detected")

    return violations


def sanitize_output(text: str) -> str:
    """Remove or redact potential sensitive patterns from text."""
    result = text
    result = EMAIL_PATTERN.sub("[EMAIL REDACTED]", result)
    result = PHONE_PATTERN.sub("[PHONE REDACTED]", result)
    result = SSN_PATTERN.sub("[SSN REDACTED]", result)
    result = CREDIT_CARD_PATTERN.sub("[CARD REDACTED]", result)
    result = API_KEY_PATTERN.sub("[KEY REDACTED]", result)
    return result


def validate_synthetic_data(data: list[dict[str, Any]]) -> list[str]:
    """
    Validate that a dataset looks synthetic — checks for known patterns.

    Returns a list of warnings if data looks potentially real.
    """
    warnings: list[str] = []

    known_synthetic_companies = {
        "Acme Corp", "TechNova Inc", "GlobalTrade LLC", "DataStream Solutions",
        "SwiftRetail", "FinSecure Partners", "MegaCorp Industries",
        "SearchLight Analytics", "ScaleUp Technologies", "EnterpriseCo",
    }

    if data:
        companies = {d.get("customer", "") for d in data}
        overlap = companies & known_synthetic_companies
        if len(overlap) < min(3, len(companies)):
            warnings.append(
                "Data may not be synthetic — fewer than expected known fictional companies found"
            )

    for item in data:
        text_fields = [str(v) for v in item.values() if isinstance(v, str)]
        full_text = " ".join(text_fields)
        pii = validate_no_pii(full_text)
        if pii:
            warnings.append(f"PII detected in item {item.get('id', '?')}: {'; '.join(pii)}")

    return warnings
