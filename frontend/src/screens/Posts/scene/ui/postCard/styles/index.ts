import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/ui';
import { shadowStyles } from '@/src/components/shadowStyles';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    ...shadowStyles
  },
  postPic: {
    width: '100%',
    height: 220,
  },
  descriptionContainer: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.darkCharcoalGrey,
  },
  tagsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingTop: 6,
    alignItems: 'center',
    gap: 8,
  },
  tag: {
    backgroundColor: Colors.lighterBlue || '#EEF6FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  tagText: {
    color: Colors.mrDBlue,
    fontWeight: '600',
    fontSize: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingTop: 8,
  },
  metaText: {
    fontSize: 13,
    color: Colors.mediumGrey,
  },
  descriptionText: {
    paddingTop: 10,
    color: Colors.mediumDarkGrey,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderTopWidth: 1,
    borderTopColor: Colors.greyLighter || '#EEE',
  },
  owner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ownerPic: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  ownerName: {
    fontSize: 14,
    color: Colors.darkCharcoalGrey,
    fontWeight: '600',
  },
  applyBtn: {
    backgroundColor: Colors.mrDBlue,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  applyText: {
    color: Colors.white,
    fontWeight: '700',
  },
});
