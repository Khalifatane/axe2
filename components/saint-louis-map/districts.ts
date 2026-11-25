export interface District {
  id: number;
  name: string;
  d: string;
}

export const DISTRICTS: District[] = [
  { id: 0, name: "Sannar", d: "M 1040 19 L 874 77 L 848 212 L 836 358 L 822 403 L 932 355 L 966 321 Z" },
  { id: 1, name: "Bango Nord", d: "M 775 34 L 740 42 L 640 118 L 578 129 L 573 161 L 602 164 L 785 107 L 788 80 Z" },
  { id: 2, name: "Bango Sud", d: "M 787 114 L 604 170 L 608 187 L 626 186 L 639 223 L 621 240 L 582 241 L 589 273 L 566 270 L 557 168 L 535 167 L 565 474 L 648 467 L 658 484 L 667 388 L 830 351 L 834 278 L 774 275 L 803 198 Z" },
  { id: 3, name: "Goxu Mbacc", d: "M 84 279 L 78 395 L 103 398 L 123 375 L 116 281 Z" },
  { id: 4, name: "Ngalelle Haut", d: "M 828 359 L 672 394 L 664 492 L 798 460 Z" },
  { id: 5, name: "Santhiaba", d: "M 78 401 L 75 479 L 96 479 L 102 404 Z" },
  { id: 6, name: "Khor Mission", d: "M 554 407 L 507 413 L 499 419 L 492 419 L 489 407 L 479 404 L 452 436 L 426 484 L 432 484 L 461 506 L 464 496 L 501 473 L 507 454 L 528 447 L 547 423 L 552 424 L 550 454 L 558 465 Z" },
  { id: 7, name: "Nord", d: "M 122 419 L 118 484 L 151 485 L 155 422 Z" },
  { id: 8, name: "Medina Marmial", d: "M 267 470 L 282 478 L 313 483 L 324 492 L 327 500 L 368 489 L 337 452 L 308 426 L 296 428 Z" },
  { id: 9, name: "Ngalelle", d: "M 796 467 L 663 499 L 653 606 L 721 604 L 752 588 Z" },
  { id: 10, name: "Tendjiguen", d: "M 284 485 L 267 480 L 261 475 L 217 483 L 213 486 L 189 528 L 241 548 Z" },
  { id: 11, name: "Basse Ndar Toute", d: "M 74 485 L 72 532 L 93 532 L 94 505 L 95 504 L 95 490 L 96 489 L 96 486 L 92 486 L 91 485 Z" },
  { id: 12, name: "Darou", d: "M 290 492 L 297 519 L 300 543 L 391 534 L 393 531 L 390 511 L 384 502 L 375 495 L 323 508 L 319 498 L 311 490 Z" },
  { id: 13, name: "Ville", d: "M 118 490 L 114 539 L 147 540 L 150 492 L 146 491 L 119 491 Z" },
  { id: 14, name: "Khor Usine", d: "M 431 494 L 420 506 L 413 505 L 407 516 L 404 519 L 399 520 L 399 523 L 405 525 L 408 540 L 410 543 L 443 550 L 444 539 L 438 531 L 438 525 L 443 517 L 448 517 L 452 526 L 459 526 L 459 514 L 433 494 Z" },
  { id: 15, name: "Balacos", d: "M 284 498 L 248 551 L 270 557 L 293 544 L 291 524 Z" },
  { id: 16, name: "Diamaguene", d: "M 187 535 L 187 577 L 174 593 L 216 614 L 263 631 L 279 596 L 267 564 L 239 556 Z" },
  { id: 17, name: "Lodo Gueth Ndar", d: "M 72 538 L 72 555 L 71 556 L 71 565 L 90 565 L 90 563 L 91 562 L 91 549 L 92 548 L 92 538 Z" },
  { id: 18, name: "Diolofene Nord", d: "M 371 542 L 299 549 L 275 562 L 286 592 L 286 598 L 280 612 L 341 609 L 348 550 Z" },
  { id: 19, name: "Sud", d: "M 114 545 L 107 643 L 140 645 L 146 546 Z" },
  { id: 20, name: "Hydrobase", d: "M 90 571 L 71 572 L 59 807 L 80 802 L 89 723 L 86 640 Z" },
  { id: 21, name: "Hlm", d: "M 172 600 L 173 601 L 177 635 L 187 649 L 187 653 L 183 658 L 184 660 L 186 660 L 203 649 L 202 633 L 203 627 L 207 618 Z" },
  { id: 22, name: "Ndiolofene Sud", d: "M 340 615 L 277 618 L 271 633 L 340 632 Z" },
  { id: 23, name: "Léona", d: "M 259 638 L 222 623 L 213 621 L 208 637 L 210 653 L 191 665 L 204 678 L 224 669 L 236 661 Z" },
  { id: 24, name: "Cité Niakh", d: "M 270 639 L 290 693 L 290 702 L 307 756 L 323 754 L 325 656 L 335 639 Z" },
  { id: 25, name: "Eaux-claires", d: "M 264 644 L 248 661 L 230 674 L 212 682 L 237 698 L 252 711 L 283 695 Z" },
  { id: 26, name: "Pikine Bas Sénégal", d: "M 182 667 L 186 683 L 196 683 L 201 689 L 194 876 L 204 901 L 196 916 L 194 940 L 208 950 L 222 950 L 212 887 L 210 776 L 214 758 L 226 747 L 217 735 L 217 722 L 228 702 Z" },
  { id: 27, name: "Diaminar", d: "M 258 717 L 281 740 L 296 758 L 300 757 L 295 742 L 295 739 L 288 720 L 288 717 L 283 704 Z" },
  { id: 28, name: "Pikine Tableaux Walo", d: "M 234 707 L 223 726 L 232 742 L 232 752 L 221 761 L 217 771 L 218 843 L 233 826 L 238 827 L 247 854 L 260 832 L 305 843 L 292 765 L 270 739 Z" },
  { id: 29, name: "Guinaw Rail", d: "M 323 760 L 299 765 L 310 823 L 314 875 L 311 912 L 319 914 L 336 902 L 338 893 L 339 837 Z" },
  { id: 30, name: "Pikine Sor Dagu", d: "M 264 839 L 250 864 L 254 893 L 308 882 L 305 850 Z" },
  { id: 31, name: "Pikine Sor Diagne", d: "M 307 889 L 253 900 L 240 927 L 229 970 L 239 985 L 256 984 L 270 962 L 280 952 L 294 943 L 291 921 L 298 911 L 304 911 Z" },
];
