// Inspectable Evidence Drawer: Claim, Source, Scope, Assumptions, Uncertainty, and What It Does Not Mean

import React from 'react';
import { X, ExternalLink, ShieldCheck, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import { ImpactPathwayRecord, SourceCitation } from '../../types/evidence';
import { SOURCE_CITATIONS, EVIDENCE_RECORDS } from '../../data/empirical-evidence';

interface EvidenceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  recordId?: string | null;
}

export const EvidenceDrawer: React.FC<EvidenceDrawerProps> = ({ isOpen, onClose, recordId }) => {
  if (!isOpen) return null;

  const record: ImpactPathwayRecord | undefined = EVIDENCE_RECORDS.find((r) => r.record_id === recordId) || EVIDENCE_RECORDS[0];
  const citations: SourceCitation[] = (record?.source_ids || []).map((id) => SOURCE_CITATIONS[id]).filter(Boolean);

  return (
    <div className="drawer-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="evidence-drawer-title">
      <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <FileText size={20} className="text-primary" />
            <h3 id="evidence-drawer-title" style={{ fontSize: '1.2rem', margin: 0 }}>
              Inspectable Evidence Dossier
            </h3>
          </div>
          <button className="btn btn-subtle btn-sm" onClick={onClose} aria-label="Close evidence drawer">
            <X size={20} />
          </button>
        </div>

        <div className="drawer-body">
          {/* Epistemic Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="badge badge-science">
              <CheckCircle2 size={12} />
              {record.epistemic_category.replace('_', ' ')}
            </span>
            <span className="badge badge-neutral">
              Confidence: {record.confidence.replace('_', ' ')}
            </span>
            <span className="badge badge-neutral">
              Scope: {record.evidence_scope.replace('_', ' ')}
            </span>
          </div>

          {/* Claim */}
          <div className="drawer-row">
            <div className="drawer-row-label">Primary Claim</div>
            <div className="drawer-row-value" style={{ fontWeight: 600, fontSize: '1.05rem', color: '#0f172a' }}>
              &ldquo;{record.claim}&rdquo;
            </div>
          </div>

          {/* Quantitative Value */}
          {(record.quantitative_value !== undefined || record.range_value !== undefined) && (
            <div className="drawer-row" style={{ background: '#f8fafc', padding: 14, borderRadius: 10, border: '1px solid #e2e8f0' }}>
              <div className="drawer-row-label">Assessed Figure / Range</div>
              <div className="drawer-row-value font-mono" style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e3a8a' }}>
                {record.quantitative_value !== undefined
                  ? `${record.quantitative_value} ${record.unit || ''}`
                  : `${record.range_value?.[0]} – ${record.range_value?.[1]} ${record.unit || ''}`}
              </div>
            </div>
          )}

          {/* Boundary & Conditions */}
          {record.conditions && record.conditions.length > 0 && (
            <div className="drawer-row">
              <div className="drawer-row-label">Accounting Boundary & Conditions</div>
              <ul style={{ paddingLeft: 18, marginTop: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {record.conditions.map((cond, i) => (
                  <li key={i} style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                    {cond}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Assumptions */}
          {record.assumptions && (
            <div className="drawer-row">
              <div className="drawer-row-label">Key Assumptions</div>
              <div className="drawer-row-value">{record.assumptions}</div>
            </div>
          )}

          {/* Uncertainty */}
          {record.uncertainty_description && (
            <div className="drawer-row">
              <div className="drawer-row-label">Uncertainty & Sensitivity</div>
              <div className="drawer-row-value">{record.uncertainty_description}</div>
            </div>
          )}

          {/* What It Does Not Mean */}
          {record.what_it_does_not_mean && (
            <div className="drawer-row" style={{ background: '#fffbeb', padding: 14, borderRadius: 10, border: '1px solid #fde68a' }}>
              <div className="drawer-row-label" style={{ color: '#92400e', display: 'flex', alignItems: 'center', gap: 6 }}>
                <AlertCircle size={14} />
                Critical Limitation: What This Does NOT Mean
              </div>
              <div className="drawer-row-value" style={{ color: '#78350f', fontSize: '0.9rem', marginTop: 4 }}>
                {record.what_it_does_not_mean}
              </div>
            </div>
          )}

          {/* Sources & Citations */}
          <div className="drawer-row">
            <div className="drawer-row-label">Authoritative Source(s)</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 6 }}>
              {citations.map((src) => (
                <div
                  key={src.id}
                  style={{
                    padding: 14,
                    borderRadius: 10,
                    border: '1px solid var(--border-subtle)',
                    background: '#ffffff',
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: '0.94rem', color: 'var(--text-primary)' }}>
                    {src.fullTitle}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 4 }}>
                    {src.authors} ({src.year}) &bull; {src.publisherOrJournal}
                  </div>
                  {src.provenanceNotes && (
                    <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: 6, fontStyle: 'italic' }}>
                      {src.provenanceNotes}
                    </div>
                  )}
                  {src.url && (
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-subtle btn-sm"
                      style={{ marginTop: 8, padding: '4px 8px', fontSize: '0.78rem', display: 'inline-flex' }}
                    >
                      <ExternalLink size={12} />
                      Open Primary Source Document
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
