let selectedTicketId=null;
const supportStatusLabel={new:'Neu',reviewing:'In Prüfung',awaiting_user:'Wartet auf Allianz',resolved:'Erledigt'};
const supportCategoryLabel={problem:'Problem',data:'Daten',ui:'UI',question:'Frage',other:'Sonstiges'};
function supportBadge(status){return status==='resolved'?'green':status==='awaiting_user'?'gold':status==='new'?'blue':'gray'}
function renderSupportSummary(){
  const alliances=[...new Set(supportSummaryRows.map(x=>x.alliance_code).filter(Boolean))].sort();
  const sel=$('#supportAlliance'),cur=sel.value;sel.innerHTML='<option value="all">Alle Allianzen</option>'+alliances.map(x=>`<option>${esc(x)}</option>`).join('');if([...sel.options].some(o=>o.value===cur))sel.value=cur;
  $('#supportOpenBadge').textContent=supportSummaryRows.filter(x=>x.status!=='resolved').length+' offen';
}
async function loadSupportTickets(){
  if(!token)return;const st=$('#supportStatusText');st.className='status muted';st.textContent='Tickets werden geladen…';
  try{const rows=await rpc('get_admin_support_tickets',{p_limit:250,p_offset:0,p_alliance:$('#supportAlliance').value||'all',p_status:$('#supportStatus').value||'all',p_category:$('#supportCategory').value||'all'});
    supportSummaryRows=Array.isArray(rows)?rows:[];renderSupportSummary();renderTicketList();st.textContent=supportSummaryRows.length+' Tickets';
    if(selectedTicketId&&!supportSummaryRows.some(x=>String(x.id)===String(selectedTicketId))){selectedTicketId=null;$('#ticketDetail').className='ticket-detail empty-state';$('#ticketDetail').textContent='Ticket auswählen.'}
  }catch(e){st.className='status err';st.textContent=e.message}
}
function renderTicketList(){
  const q=$('#supportSearch').value.trim().toLowerCase(),rows=supportSummaryRows.filter(t=>!q||String(t.subject||'').toLowerCase().includes(q)||String(t.alliance_code||'').toLowerCase().includes(q));
  $('#ticketList').innerHTML=rows.length?rows.map(t=>`<article class="ticket-card ${String(t.id)===String(selectedTicketId)?'active':''}" data-ticket="${esc(t.id)}"><div class="ticket-top"><h3>${esc(t.subject)}</h3><span class="badge ${supportBadge(t.status)}">${esc(supportStatusLabel[t.status]||t.status)}</span></div><small>${esc(t.alliance_code)} · ${esc(supportCategoryLabel[t.category]||t.category)} · ${esc(dt(t.last_message_at))}</small><small style="margin-top:5px;display:block">${fmt(t.message_count)} Nachrichten · ${fmt(t.evidence_count)} Screenshots</small></article>`).join(''):'<div class="empty-state">Keine Tickets.</div>';
  document.querySelectorAll('.ticket-card').forEach(el=>el.onclick=()=>openTicket(el.dataset.ticket));
}
async function openTicket(id){
  selectedTicketId=id;renderTicketList();const host=$('#ticketDetail'),ticket=supportSummaryRows.find(t=>String(t.id)===String(id));if(!ticket)return;host.className='ticket-detail';host.innerHTML='<div class="empty-state">Ticket wird geladen…</div>';
  try{const [msgs,ev]=await Promise.all([rpc('get_admin_support_ticket_messages',{p_ticket_id:id}),rpc('get_admin_support_ticket_evidence',{p_ticket_id:id})]);
    const evidence=Array.isArray(ev)?ev:[],signed=await Promise.all(evidence.map(async e=>({...e,url:await signSupportPath(e.storage_path).catch(()=>null)})));
    host.innerHTML=`<div class="ticket-detail-head"><div><h3>${esc(ticket.subject)}</h3><div class="muted">${esc(ticket.alliance_code)} · ${esc(supportCategoryLabel[ticket.category]||ticket.category)} · erstellt ${esc(dt(ticket.created_at))}</div></div><span class="badge ${supportBadge(ticket.status)}">${esc(supportStatusLabel[ticket.status]||ticket.status)}</span></div><div class="support-thread">${(msgs||[]).map(m=>`<div class="support-msg ${m.sender_type==='support'?'support':'alliance'}"><b>${esc(m.sender_type==='support'?'Support':m.alliance_code)}</b><div>${esc(m.message)}</div><small>${esc(dt(m.created_at))}</small></div>`).join('')||'<div class="muted">Keine Nachrichten.</div>'}</div>${signed.length?`<h4>Screenshots</h4><div class="evidence-grid">${signed.map(e=>e.url?`<a class="evidence" href="${esc(e.url)}" target="_blank" rel="noopener"><img src="${esc(e.url)}" alt=""><span>${esc(e.file_name)}</span></a>`:`<div class="evidence"><span>${esc(e.file_name)} · nicht ladbar</span></div>`).join('')}</div>`:''}<div class="ticket-actions"><select id="ticketStatusSelect">${['new','reviewing','awaiting_user','resolved'].map(s=>`<option value="${s}" ${s===ticket.status?'selected':''}>${esc(supportStatusLabel[s])}</option>`).join('')}</select><button id="saveTicketStatus" class="btn secondary">Status speichern</button><button id="resolveTicket" class="btn success">Als erledigt markieren</button><span id="ticketActionStatus" class="status muted"></span></div>`;
    $('#saveTicketStatus').onclick=()=>setTicketStatus($('#ticketStatusSelect').value);$('#resolveTicket').onclick=()=>setTicketStatus('resolved');
  }catch(e){host.className='ticket-detail';host.innerHTML='<div class="status err">'+esc(e.message)+'</div>'}
}
async function setTicketStatus(status){const st=$('#ticketActionStatus');if(!selectedTicketId)return;try{await rpc('admin_set_support_ticket_status',{p_ticket_id:selectedTicketId,p_status:status});st.className='status ok';st.textContent='Status gespeichert.';await loadDashboard();await loadSupportTickets();await openTicket(selectedTicketId);if(typeof loadLogs==='function')loadLogs(0)}catch(e){st.className='status err';st.textContent=e.message}}
